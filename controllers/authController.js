// Controller Functions
const registerController = (register = async (req, res) => {
  const { username, email, password } = req.body;

  const { error } = registerUserSchema.validate({ username, email, password });
  if (error) return res.status(400).json(error.details[0].message);

  try {
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashpassword });
    await newUser.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const { error } = loginUserSchema.validate({ email, password });
  if (error) return res.status(400).json(error.details[0].message);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "Invalid email and password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ message: "Invalid email and password" });
    }

    const token = generateToken(user._id);

    res.send({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

module.exports = { registerController, loginController };
