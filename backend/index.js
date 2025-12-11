const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mssql = require('mssql');


const path = require('path');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve index.html as landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Healthcheck endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// SQL Server config (adjust as needed)
const dbConfig = {
    user: 'sa', // or your new login
    password: 'sa57843hFL^%*#',
    server: 'localhost',
    database: 'HealthcareDB',
    options: {
        trustServerCertificate: true
    }
};


// Login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        await mssql.connect(dbConfig);
        const result = await mssql.query`SELECT * FROM Users WHERE Username = ${username}`;
        const user = result.recordset[0];
        if (user && user.PasswordHash === password) { // For demo only; use hashing in production
            res.json({ message: 'Login successful', user: { username: user.Username, role: user.Role } });
        } else {
            res.status(401).json({ message: '401: Unauthorized' }); // (hint: invalid login credentials)
        }
    } catch (err) {
        res.status(500).json({ message: '500: Internal Server Error', error: err.message });
        console.error(err);
    }
});


// Helper: get user role from username and password
async function getUserRole(username, password) {
    await mssql.connect(dbConfig);
    const result = await mssql.query`SELECT Role FROM Users WHERE Username = ${username} AND PasswordHash = ${password}`;
    return result.recordset[0]?.Role;
}

// Patients endpoints (require admin or patients role)
app.get('/api/patients', async (req, res) => {
    const { username, password } = req.query;
    try {
        const role = await getUserRole(username, password);
        if (role === 'admin' || role === 'patients') {
            const result = await mssql.query`SELECT * FROM Patients`;
            res.json(result.recordset);
        } else {
            res.status(403).json({ message: 'Forbidden: insufficient role' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
app.post('/api/patients', async (req, res) => {
    const { username, password, firstName, lastName, dob, gender, address } = req.body;
    try {
        const role = await getUserRole(username, password);
        if (role === 'admin' || role === 'patients') {
            await mssql.query`INSERT INTO Patients (FirstName, LastName, DateOfBirth, Gender, Address) VALUES (${firstName}, ${lastName}, ${dob}, ${gender}, ${address})`;
            res.json({ message: 'Patient added' });
        } else {
            res.status(403).json({ message: 'Forbidden: insufficient role' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
// Update patient endpoint (admin or patients role)
app.put('/api/patients/:id', async (req, res) => {
    const { username, password, firstName, lastName, dob, gender, address } = req.body;
    const patientId = req.params.id;
    try {
        const role = await getUserRole(username, password);
        if (role === 'admin' || role === 'patients') {
            await mssql.query`UPDATE Patients SET FirstName=${firstName}, LastName=${lastName}, DateOfBirth=${dob}, Gender=${gender}, Address=${address} WHERE PatientID=${patientId}`;
            res.json({ message: 'Patient updated' });
        } else {
            res.status(403).json({ message: 'Forbidden: insufficient role' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
// Delete patient endpoint (admin or patients role)
app.delete('/api/patients/:id', async (req, res) => {
    const { username, password } = req.query;
    const patientId = req.params.id;
    try {
        const role = await getUserRole(username, password);
        if (role === 'admin' || role === 'patients') {
            await mssql.query`DELETE FROM Patients WHERE PatientID = ${patientId}`;
            res.json({ message: 'Patient deleted' });
        } else {
            res.status(403).json({ message: 'Forbidden: insufficient role' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// Drugs endpoints (require admin or drugs role)
app.get('/api/drugs', async (req, res) => {
    const { username, password } = req.query;
    try {
        const role = await getUserRole(username, password);
        if (role === 'admin' || role === 'drugs') {
            const result = await mssql.query`SELECT * FROM Drugs`;
            res.json(result.recordset);
        } else {
            res.status(403).json({ message: 'Forbidden: insufficient role' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
app.post('/api/drugs', async (req, res) => {
    const { username, password, name, description, dosage } = req.body;
    try {
        const role = await getUserRole(username, password);
        if (role === 'admin' || role === 'drugs') {
            await mssql.query`INSERT INTO Drugs (Name, Description, Dosage) VALUES (${name}, ${description}, ${dosage})`;
            res.json({ message: 'Drug added' });
        } else {
            res.status(403).json({ message: 'Forbidden: insufficient role' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
// Update drug endpoint (admin or drugs role)
app.put('/api/drugs/:id', async (req, res) => {
    const { username, password, name, description, dosage } = req.body;
    const drugId = req.params.id;
    try {
        const role = await getUserRole(username, password);
        if (role === 'admin' || role === 'drugs') {
            await mssql.query`UPDATE Drugs SET Name=${name}, Description=${description}, Dosage=${dosage} WHERE DrugID=${drugId}`;
            res.json({ message: 'Drug updated' });
        } else {
            res.status(403).json({ message: 'Forbidden: insufficient role' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
// Delete drug endpoint (admin or drugs role)
app.delete('/api/drugs/:id', async (req, res) => {
    const { username, password } = req.query;
    const drugId = req.params.id;
    try {
        const role = await getUserRole(username, password);
        if (role === 'admin' || role === 'drugs') {
            await mssql.query`DELETE FROM Drugs WHERE DrugID = ${drugId}`;
            res.json({ message: 'Drug deleted' });
        } else {
            res.status(403).json({ message: 'Forbidden: insufficient role' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend API running on port ${PORT}`);
});
