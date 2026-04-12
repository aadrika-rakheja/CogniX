const UserProgress=require('../models/UserProgress');
const Subjects=require('../models/Subjects');
const Topics=require('../models/Topics');

const initializeUserProgress=async(req,res)=>{
    try{
        // const userId=req.user.id;
        const userId="69c9ff425d7de4f98ee545aa";
        const findUser=await UserProgress.findOne({userId});
        if(findUser)
        {
            return res.status(200).json({
                status:"User Progress found successfully",
                data:findUser
            });
        }

        const subj=await Subjects.find().sort({subjName: 1});

        const courseProgressData=[];

        for(const s of subj)
        {
             const top=await Topics.find({subjName:s._id}).sort({order:1});

             const topicProgressData=top.map((t)=>({
                topic_id:t._id,
                watchedTime:0,
                topic_status:"Not Started"
             }));

             courseProgressData.push({
                course_id:s._id,
                course_status:"Not Started",
                topicProgress:topicProgressData
             });

        }


        const progress=await UserProgress.create({
            userId,
            streak:0,
            lastActiveDate:null,
            totTime:0,
            courseProgress:courseProgressData
        });

        return res.status(201).json({
            success:true,
            msg:"User Progress initialized",
            data:progress
        });

    }
    catch(err)
    {
        res.status(400).json({
            success:false,
            error:err.message
        })
    }
}


const syncUserProgress = async (progress) => {
  let updated = false;

  // ✅ helper for safe ID extraction
  const getId = (id) => id?._id?.toString() || id?.toString();

  // 🔥 1. FETCH ALL COURSES
  const allCourses = await Subjects.find();
  const allCourseIds = new Set(allCourses.map(c => c._id.toString()));

  // 🔥 2. REMOVE DELETED COURSES
  const beforeCourses = progress.courseProgress.length;

  progress.courseProgress = progress.courseProgress.filter(c =>
    allCourseIds.has(getId(c.course_id))
  );

  if (beforeCourses !== progress.courseProgress.length) {
    updated = true;
  }

  // 🔥 3. ADD NEW COURSES
  const existingCourseIds = new Set(
    progress.courseProgress.map(c => getId(c.course_id))
  );

  for (const course of allCourses) {
    if (!existingCourseIds.has(course._id.toString())) {
      const topics = await Topics.find({ subjName: course._id });

      progress.courseProgress.push({
        course_id: course._id,
        course_status: "Not Started",
        topicProgress: topics.map(t => ({
          topic_id: t._id,
          watchedTime: 0,
          topic_status: "Not Started"
        }))
      });

      updated = true;
    }
  }

  // 🔥 4. SYNC TOPICS
  for (const course of progress.courseProgress) {

    const courseId = getId(course.course_id);

    const allTopics = await Topics.find({ subjName: courseId });

    // 🚑 SAFETY: don’t delete if query fails
    if (!allTopics || allTopics.length === 0) {
      console.log("⚠️ No topics found for course:", courseId);
      continue;
    }

    const allTopicIds = new Set(allTopics.map(t => t._id.toString()));

    // ❌ REMOVE DELETED TOPICS
    const beforeTopics = course.topicProgress.length;

    course.topicProgress = course.topicProgress.filter(tp =>
      allTopicIds.has(getId(tp.topic_id))
    );

    if (beforeTopics !== course.topicProgress.length) {
      updated = true;
    }

    // 🔥 ADD NEW TOPICS
    const existingTopicIds = new Set(
      course.topicProgress.map(tp => getId(tp.topic_id))
    );

    const newTopics = [];

    for (const topic of allTopics) {
      if (!existingTopicIds.has(topic._id.toString())) {
        newTopics.push({
          topic_id: topic._id,
          watchedTime: 0,
          topic_status: "Not Started"
        });
      }
    }

    if (newTopics.length > 0) {
      course.topicProgress.push(...newTopics);
      updated = true;
    }
  }

  // 🔥 5. SAVE ONLY IF CHANGED
  if (updated) {
    await progress.save();
  }

  return progress;
};

const getUserProgress=async(req,res)=>{
    try{
        // const userId=req.user.id;
        const userId="69c9ff425d7de4f98ee545aa";

        const progress=await UserProgress.findOne({userId})
                        .populate("courseProgress.course_id")
                        .populate("courseProgress.topicProgress.topic_id");

        
        if(!progress)
        {
            progress =await initializeUserProgress();
        }

       
        await syncUserProgress(progress);

         //update streak
        const today=new Date();
        today.setHours(0,0,0,0);
        if(!progress.lastActiveDate)
        {
            progress.streak=1;
            progress.lastActiveDate=today;
        }else{
            const lastDate=progress.lastActiveDate;
            lastDate.setHours(0,0,0,0);
            const diff=Math.floor((today-lastDate)/(1000*60*60*24));
            if(diff===1){
                progress.streak+=1;
                progress.lastActiveDate=today;
            }else{
                progress.streak=1;
                progress.lastActiveDate=today;
            }
        }
        
        await progress.save();


        let totTopics=0,compTopics=0,compCourses=0;

        progress.courseProgress.forEach(course => {

            totTopics+=course.topicProgress.length;
            const compTopicsInCourse=course.topicProgress.filter(
                t=>t.topic_status=="Completed"
            ).length;

            compTopics+=compTopicsInCourse;

            if(course.course_status=="Completed")
                compCourses+=1;
            
        });

        return res.status(200).json({
            success:true,
            data:progress,
            dashboard_stats:{
                totStudyTime:progress.totTime,
                streak:progress.streak,
                totCourses:progress.courseProgress.length,
                compCourses:compCourses,
                totTopics:totTopics,
                compTopics:compTopics
            }
        });
    }
    catch(err)
    {
        res.status(400).json({
            success:false,
            error:err.message
        })
    }
}


const updateUserProgress=async(req,res)=>{
    try{
        // const userId=req.user.id;
        const userId="69c9ff425d7de4f98ee545aa";

        const progress=await UserProgress.findOne({userId});
        const { course_id, topic_id , watchedTime, completed}=req.body;
        

        if(!course_id || ! topic_id || watchedTime==null)
            return res.status(400).json({
                success:false,
                msg:"Course Id, topic Id and watchedTime is required"
            });

        if(!progress)
            return res.status(400).json({
                success:false,
                msg:"User Progress not found"
            });

        const course=progress.courseProgress.find(c=>
             c.course_id.toString() === course_id.toString()
        );
        
        if(!course)
            return res.status(400).json({
                success:false,
                msg:"Course not found"
            });


        const topic=course.topicProgress.find(
            t=>t.topic_id.toString() === topic_id.toString()
        );
        

        if(!topic)
            return res.status(400).json({
                success:false,
                msg:"Topic not found"
            });


        //update wateched time
        const oldWatched=topic.watchedTime||0;
        const newWatched=Math.max(oldWatched,watchedTime);

        progress.totTime+=(newWatched-oldWatched);
        topic.watchedTime=newWatched;


        //update topic status
        if(completed)
            topic.topic_status="Completed";
        else if(topic.watchedTime>0)
            topic.topic_status="In-progress";

        //update course status
        const allTopicsComp=course.topicProgress.every(
            t=>t.topic_status=="Completed"
        );
        const someTopicsStarted=course.topicProgress.some(
            t=>t.topic_status!="Not Started"
        );

        if(allTopicsComp)
            course.course_status="Completed";
        else if(someTopicsStarted)
            course.course_status="In-progress"

        await progress.save();

        return res.status(200).json({
            success:true,
            msg:"Topic updated",
            data:progress
        })

    }catch(e){
        return res.status(400).json({
            success:false,
            error:e.message
        });
    }
}

module.exports={initializeUserProgress,getUserProgress,updateUserProgress};