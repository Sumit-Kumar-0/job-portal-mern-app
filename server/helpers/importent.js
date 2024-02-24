export const registerController = async (req, res, next) => {
    try {
      const { name, email, password, phone, role } = req.body;
  
      // Check if all required fields are present
      if (!(name && email && password && phone && role)) {
        throw new ErrorHandler("Please fill in all the required fields.", 400);
      }
  
      // Validate email format
      if (!isValidEmail(email)) {
        throw new ErrorHandler("Please provide a valid email address.", 400);
      }
  
      // Validate phone format
      if (!isValidPhone(phone)) {
        throw new ErrorHandler("Please provide a valid phone number.", 400);
      }
  
      // Check if the email is already in use
      if (await isEmailInUse(email)) {
        throw new ErrorHandler(
          "Email address is already in use. Please use a different email.",
          400
        );
      }
  
      // Check if the phone is already in use
      if (await isPhoneInUse(phone)) {
        throw new ErrorHandler(
          "You are already registered with this phone number and email. Please log in.",
          400
        );
      }
  
      // Create a new user instance
      const newUser = new userModel({
        name,
        email,
        password,
        phone,
        role,
      });
      await newUser.save();
  
      // Send success response to the client
      sendToken(
        newUser,
        201,
        res,
        `Welcome ${newUser.name}, you have registered successfully!`
      );
    } catch (error) {
      next(error); // Pass the caught error to the error handling middleware
    }
  };
  
  // Helper function to check if email is in use
  const isEmailInUse = async (email) => {
    const existingUser = await userModel.findOne({ email });
    return existingUser ? true : false;
  };
  
  // Helper function to check if phone is in use
  const isPhoneInUse = async (phone) => {
    const existingUserByPhone = await userModel.findOne({ phone });
    return existingUserByPhone ? true : false;
  };
  
  // Helper function to validate email format
  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Helper function to validate phone format
  const isValidPhone = (phone) => {
    // Regular expression for phone number validation (you may need to adjust this based on your requirements)
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };
  