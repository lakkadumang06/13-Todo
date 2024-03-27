const { cache } = require("ejs");
const todomodal = require("../model/todomodal");
const bcrypt = require("bcrypt");

exports.insert = async (req, res) => {
  try {
    const { name, email, password,userId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await todomodal.create({
      name,
      email,
      userId,
      password: hashedPassword,
    });

    return res.status(201).json({
      status: "Success",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
    });
  }
};
exports.get_data = async (req, res) => {
  try {
    userId = req.query.userId
    const data = await todomodal.find({userId:userId});
    return res.status(201).json({
      status: "Success",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
    });
  }
};
exports.update_data = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data  = await todomodal.findByIdAndUpdate(id, {name, email, password: hashedPassword},{new:true});
    return res.status(200).json({
      status: "Success",
      data: data,
    })
  }
  catch (error) {
    return res.status(500).json({
      status: "Error",
    }); 
}
}
exports.delete_data = async (req, res) => {
    try{
        const id = req.params.id;
        const data=  await todomodal.findByIdAndDelete(id);
        return res.status(200).json({
            status: "Success",
            message:"deleted successfully"
        }) 

    }
    catch(error){
        return res.status(500).json({
            status: "Error",
            message:"something went wrong"
        })
}
}

exports.get_single = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await todomodal.findById(id);
    res.status(200).json({
      status: "Success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
    });
  }
};

