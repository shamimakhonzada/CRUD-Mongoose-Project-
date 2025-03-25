const enquiryModel = require("../../models/enquiry.model");

let enquiryInsert = async (req, res) => {
  let { sName, sEmail, sPhone, sMessage } = req.body;
  let enquiry = new enquiryModel({
    name: sName,
    email: sEmail,
    phone: sPhone,
    message: sMessage,
  });
  enquiry
    .save()
    .then(() => {
      res.send({ status: 1, message: "Data inserted successfully" });
    })
    .catch((err) => {
      res.send({
        status: 0,
        message: "Error while inserting data",
        error: err,
      });
    });
};

let enquiryList = async (req, res) => {
  let enquiryList = await enquiryModel.find();
  res.status(200).json({
    status: 1,
    message: "Data fetched successfully",
    data: enquiryList,
  });
  //res.send(enquiryList);
};

let enquiryDelete = async (req, res) => {
  let enquiryID = req.params.id;
  let deleteEnquiry = await enquiryModel.deleteOne({ _id: enquiryID });
  res.send({
    status: 1,
    message: "Data deleted successfully",
    data: deleteEnquiry,
  });
};

let enquiryUpdate = async (req, res) => {
  let enquiryID = req.params.id;
  let { sName, sEmail, sPhone, sMessage } = req.body;
  let updateObject = {
    name: sName,
    email: sEmail,
    phone: sPhone,
    message: sMessage,
  };

  let updateEnquiry = await enquiryModel.updateOne(
    { _id: enquiryID },
    updateObject
  );

  res.send({
    status: 1,
    message: "Data updated successfully",
    data: updateEnquiry,
  });
};

module.exports = {
  enquiryInsert,
  enquiryList,
  enquiryDelete,
  enquiryUpdate,
};
