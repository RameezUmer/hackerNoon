import  Activity  from "../models/activity.model.js";

const getActivities = async (req, res) => {
    try{
        const activities = await Activity.find();
        res.status(200).json(activities);
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}

const addActivity = async (req, res) => {
    const activity = new Activity(req.body);

    try {
        const newActivity = await activity.save();
        res.status(201).json(newActivity);
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

const deleteActivity = async (req, res) => {

    try{
      const activityId = req.params.id;

  
        const activity = await Activity.findByIdAndDelete(activityId);
  
        if(!activity){
          return res.status(404).json({msg: 'Activity not found'})
        }
      
        return res.status(200).json({ msg: "Activity deleted seccessfully"})
    }
  
    catch(error){
      res.status(500).json({ msg: "Error deleting message", error: error.message})
    }
  }

  const editActivtiy = async (req, res) => {

    try{

        const activityId = req.params.id;
        const {name, time} = req.body;

        console.log(name, time, activityId) ;
        

        const activity = await Activity.findByIdAndUpdate(
            activityId,
            {name, time},
            {new: true}
        );

        if(!activity){
            res.status(404).json({ msg: "Activity not found"});
        }
        console.log("///////////",activity);
        

        res.status(200).json({activity});
    }catch(err){
     res.status(500).json({ msg: "Error in updating message",error: err.message})
    }

  }
  

export {getActivities, addActivity, deleteActivity, editActivtiy}