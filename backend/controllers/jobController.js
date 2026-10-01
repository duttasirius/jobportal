import { Job } from "../models/jobModel.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      experienceLevel,
      location,
      jobType,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    // Validate required fields
    if (
      !title ||
      !description ||
      !requirements ||
      salary === undefined ||
      experienceLevel === undefined ||
      !location ||
      !jobType ||
      position === undefined ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      experienceLevel,
      location,
      jobType,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Job posted successfully.",
      success: true,
      job,
    });
  } catch (error) {
    console.error("Post Job Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    // req.query contains data sent in the URL after a ?. || GET /api/job/get?keyword=react
    const keyword = req.query.keyword || "";

    // MongoDB search query
    // $or → Match if ANY condition is true
    // $regex → Search for the keyword inside the text
    // $options: "i" → Case-insensitive (React = react = REACT)
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } }, // Search in job title
        { description: { $regex: keyword, $options: "i" } }, // Search in description
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// for user
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};

// get all job by  admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      select: "name logo",
    });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
