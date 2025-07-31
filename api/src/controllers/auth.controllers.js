import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @desc Register
// @route POST /auth/register
// @access Public
export const register = async (req, res) => {
  try {
    // GETTING THE DATA FROM THE USER
    const { email, password, username, role } = req.body;

    // AUTHENTICATION CHECK FOR EMPTY FIELDS
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'All fields are required *' });
    }

    // NOW CHECK IF THE USER ALREADY AXISTS
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    // IF USER ALREADY EXISTS THROW THIS ERROR
    if (existingUser) {
      return res
        .status(409)
        .json({ error: 'User already exists with this credentials' });
    }

    // HASH PASSWORD
    const hashedPwd = await bcrypt.hash(password, 10);
    console.log('Hashed Pwd', hashedPwd);

    // ROLE CHECKING
    let assignedRole = 'Customer';

    if (role === 'Admin' && role) {
      assignedRole = role;
    }

    // CREATE A NEW USER
    const user = {
      username,
      email,
      password: hashedPwd,
      role: assignedRole,
    };

    const newUser = await User.create(user);

    res.status(201).json({
      message: `User registered ${newUser.username} successfully`,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message || 'Error while registering user' });
  }
};

/// @desc Login
// @route POST /auth/login
// @access Public
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // ✅ Corrected password compare
    const isMatchPsw = await bcrypt.compare(password, user.password);

    if (!isMatchPsw) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // ✅ Generate tokens
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30d' }
    );

    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '30d' }
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message || 'Error while logging in user' });
  }
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
export const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });

      const foundUser = await User.findOne({
        email: decoded.email,
      }).exec();

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: foundUser.email,
            role: foundUser.role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      res.json({ accessToken });
    }
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
export const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.json({ message: 'Cookie cleared' });
};