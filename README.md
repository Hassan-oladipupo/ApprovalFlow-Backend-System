### Approval Request and Approval System

This is a Node.js and Express backend for managing approval requests within an organization.

#### Features
- **User Authentication**: JWT-based with role-based access.
- **Request Submission**: Submit requests with attached documents.
- **Approval Process**: Review, comment, and approve/reject requests.

#### Installation
1. Clone the repository and navigate to the directory:
   ```bash
   git clone https://github.com/Hassan-oladipupo/ApprovalFlow-Backend-System.git
   cd approval-system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in a `.env` file:
   ```bash
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

#### API Endpoints
- **User Management**: Register, login, and manage users.
- **Approval Requests**: Submit, review, and comment on requests.

#### License
This project is licensed under the MIT License.