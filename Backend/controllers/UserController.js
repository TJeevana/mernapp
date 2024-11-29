const User = require('../models/usermodel');

// Register a new user
// Register a new user
exports.registerUser = async (req, res) => {
    const { username, email, password, agentRequested } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Set the user role to 'member' for all registrations
        const userRole = 'member'; 

        // Create the new user (id will be auto-incremented)
        const user = await User.create({
            username,
            email,
            password,
            role: userRole, // Always set to member
            agentRequested, // Set agentRequested based on the registration
        });

        // You can access the auto-generated ID if you want to log it
        console.log('New user registered with ID:', user.id);

        res.status(201).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Approve agent registration
exports.approveAgent = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.role !== 'member') {
            return res.status(400).json({ success: false, message: 'User is not eligible for agent approval' });
        }

        user.role = 'agent';
        user.agentApproved = true; // Assuming you have this field
        user.agentRequested = false; // Reset the request status after approval
        await user.save();

        res.status(200).json({ success: true, message: 'Agent approved successfully', user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Reject agent request
exports.rejectAgent = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.agentRequested = false; // Reset request status
        user.agentApproved = false;   // Reset approval status
        await user.save();

        res.status(200).json({ success: true, message: 'Agent request rejected successfully', user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Update user role (admin can change any user’s role)
exports.updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!['member', 'agent', 'admin'].includes(role)) {
            return res.status(400).json({ success: false, message: 'Invalid role' });
        }

        user.role = role;
        await user.save();

        res.status(200).json({ success: true, message: 'User role updated successfully', user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
