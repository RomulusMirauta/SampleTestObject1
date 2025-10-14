-- Users table for login
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Role NVARCHAR(20) NOT NULL
);

-- Patients table
CREATE TABLE Patients (
    PatientID INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(100),
    LastName NVARCHAR(100),
    DateOfBirth DATE,
    Gender NVARCHAR(10),
    Address NVARCHAR(255)
);

-- Drugs table
CREATE TABLE Drugs (
    DrugID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100),
    Description NVARCHAR(255),
    Dosage NVARCHAR(50)
);

CREATE TABLE Prescriptions (
    PrescriptionID INT PRIMARY KEY IDENTITY(1,1),
    PatientID INT FOREIGN KEY REFERENCES Patients(PatientID),
    DrugID INT FOREIGN KEY REFERENCES Drugs(DrugID),
    PrescribedDate DATE,
    Dosage NVARCHAR(50)
);
