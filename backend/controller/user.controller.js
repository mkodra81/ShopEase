import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(10);

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    let foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      let newUser = new User({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, salt),
      });

      await newUser.save();
      return res.status(200).json({ message: "User registered successfully" });
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    let foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    } else {
      let isMatch = bcrypt.compareSync(password, foundUser.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      } else {
        const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
          
        });
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });
        return res.status(200).json({
          message: "Login successful",
          token,
          id: foundUser._id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
          role: foundUser.role,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      console.error("Token not found in cookies");
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("Token verification failed", err);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      console.error("User not found for decoded token ID");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User fetched successfully", user);
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in getMe function", error);
    return res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", { path: "/" });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const fetchUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export { registerUser, loginUser, getMe, logoutUser, fetchAllUsers, fetchUserById, updateUser, deleteUser };
