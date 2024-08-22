### Approval Request and Approval System

This is a Node.js and Express backend for managing approval requests within an organization.

#### Features
- **User Authentication**: JWT-based with role-based access.
- **Request Submission**: Submit requests with attached documents.
- **Approval Process**: Review, comment, and approve/reject requests.
- **Notifications**: Email alerts to stakeholders and CC'd users.

#### Installation
1. Clone the repository and navigate to the directory:
   ```bash
   git clone https://github.com/yourusername/approval-system.git
   cd approval-system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in a `.env` file:
   ```bash
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_HOST=your_email_host
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_password
   ```
4. Start the server:
   ```bash
   npm start
   ```

#### API Endpoints
- **User Management**: Register, login, and manage users.
- **Approval Requests**: Submit, review, and comment on requests.

#### License
This project is licensed under the MIT License.