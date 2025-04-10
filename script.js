//Function to register an employee
function registerEmployee() {
    // Get form inputs
    const firstName = document.getElementById("firstName")?.value.trim();
    const lastName = document.getElementById("lastName")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();
    const confirmPassword = document.getElementById("confirmPassword")?.value.trim();
    const address = document.getElementById("address")?.value.trim();
    const contactNumber = document.getElementById("contactNumber")?.value.trim();

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !confirmPassword || !address || !contactNumber) {
        alert("Please fill in all required fields.");
        return;
    }

    // Validate password match
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    // Generate a random employee ID
    const employeeId = "EMP" + Math.floor(100000 + Math.random() * 900000);

    // Create employee object
    const employeeDetails = {
        id: employeeId,
        firstName,
        lastName,
        email,
        password,
        address,
        contactNumber,
    };

    // Retrieve existing employees or initialize empty array
    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    // Check if employee already exists
    if (employees.some(employee => employee.email === email)) {
        alert("Employee already exists with the same email.");
        return;
    }

    // Add new employee to the array
    employees.push(employeeDetails);

    // Save updated employees list back to localStorage
    localStorage.setItem("employees", JSON.stringify(employees));

    // Display success popup
    document.getElementById("empIdDisplay").textContent = employeeId;
    document.getElementById("empNameDisplay").textContent = `${firstName} ${lastName}`;
    document.getElementById("successPopup").style.display = "block";

    // Clear form fields after submission
    document.getElementById("registrationForm").reset();
}

// Function to register a customer
// Function to register a customer
function registerCustomer() {
    // Get form inputs
    const name = document.getElementById("name")?.value.trim();
    const account = document.getElementById("account")?.value.trim();
    const ifsc = document.getElementById("ifsc")?.value.trim();
    const balance = parseFloat(document.getElementById("balance")?.value) || 0;
    const aadhaar = document.getElementById("aadhaar")?.value.trim();
    const pan = document.getElementById("pan")?.value.trim();
    const dob = document.getElementById("dob")?.value;
    const gender = document.getElementById("gender")?.value;
    const marital = document.getElementById("marital")?.value;
    const email = document.getElementById("email")?.value.trim();
    const contact = document.getElementById("contact")?.value.trim();
    const password = document.getElementById("password")?.value.trim();
    const address = document.getElementById("address")?.value.trim();

    // Validate required fields
    if (!name || !account || !ifsc || isNaN(balance) || !aadhaar || !pan || !dob || 
        !gender || !marital || !email || !contact || !password || !address) {
        alert("Please fill in all required fields.");
        return;
    }

    // Generate a random customer SSN ID
    const ssnId = "CUST" + Math.floor(100000 + Math.random() * 900000);

    // Create customer object with consistent naming
    const customerDetails = {
        ssn: ssnId,  // Changed from SSN_ID to ssn for consistency
        name: name,   // Changed from Name to name
        accountNumber: account,
        ifsc: ifsc,
        balance: balance,
        aadhaar: aadhaar,
        pan: pan,
        dob: dob,
        gender: gender,
        maritalStatus: marital,
        email: email,
        contact: contact,
        password: password,
        address: address
    };

    // Retrieve existing customers or initialize empty array
    let customers = JSON.parse(localStorage.getItem("customers")) || [];

    // Check if customer already exists (by email or account number)
    if (customers.some(customer => customer.email === email || customer.accountNumber === account)) {
        alert("Customer already exists with the same email or account number.");
        return;
    }

    // Add new customer to the array
    customers.push(customerDetails);

    // Save updated customers list back to localStorage
    localStorage.setItem("customers", JSON.stringify(customers));

    // Display success popup
    const custIdDisplay = document.getElementById("custIdDisplay");
    const custNameDisplay = document.getElementById("custNameDisplay");
    if (custIdDisplay && custNameDisplay) {
        custIdDisplay.textContent = ssnId;
        custNameDisplay.textContent = name;
        document.getElementById("successPopup").style.display = "block";
    }

    // Clear form fields after submission
    document.getElementById("customerRegistrationForm").reset();
}

// Function to handle login for customer
function handleLogin(type) {
    if (type !== "customer") return;

    const enteredId = document.getElementById("customerId")?.value.trim();
    const enteredPassword = document.getElementById("customerPassword")?.value.trim();

    if (!enteredId || !enteredPassword) {
        alert("Please enter both ID and password");
        return;
    }

    // Retrieve stored customers
    const customers = JSON.parse(localStorage.getItem("customers")) || [];

    // Find customer by ssn (previously SSN_ID)
    const customer = customers.find(c => 
        (c.ssn === enteredId || c.email === enteredId) && 
        c.password === enteredPassword
    );

    if (customer) {
        // Store the logged-in customer's ssn in localStorage
        localStorage.setItem("loggedInCustomerId", customer.ssn);
        localStorage.setItem("loggedInCustomerName", customer.name);
        localStorage.setItem("loggedInCustomerBalance", customer.balance);
        
        alert("Login successful! Redirecting to dashboard...");
        window.location.href = "cutdash.html";
    } else {
        alert("Invalid credentials! Please try again.");
    }
}

// Function to get customer details
function getCustomerDetails(customerId) {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    return customers.find(c => 
        c.ssn === customerId || 
        c.email === customerId ||
        c.accountNumber === customerId
    );
}

// Function to update customer balance
function updateCustomerBalance(customerId, amount, isCredit = false) {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const customerIndex = customers.findIndex(c => c.ssn === customerId);
    
    if (customerIndex !== -1) {
        const currentBalance = parseFloat(customers[customerIndex].balance) || 0;
        customers[customerIndex].balance = isCredit ? 
            (currentBalance + amount).toFixed(2) : 
            (currentBalance - amount).toFixed(2);
        
        localStorage.setItem("customers", JSON.stringify(customers));
        return true;
    }
    return false;
}

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    // Handle customer registration form submission
    const customerForm = document.getElementById("customerRegistrationForm");
    if (customerForm) {
        customerForm.addEventListener("submit", function(e) {
            e.preventDefault();
            registerCustomer();
        });
    }

    // Handle login form submission if on login page
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            handleLogin("customer");
        });
    }
});

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    // Handle employee registration form submission
    const employeeRegistrationForm = document.getElementById("registrationForm");
    if (employeeRegistrationForm) {
        employeeRegistrationForm.addEventListener("submit", function (event) {
            event.preventDefault();
            registerEmployee();
        });
    }

    // Handle customer registration form submission
    const customerRegistrationForm = document.getElementById("customerRegistrationForm");
    if (customerRegistrationForm) {
        customerRegistrationForm.addEventListener("submit", function (event) {
            event.preventDefault();
            registerCustomer();
        });
    }
});

// Function to handle login for both customer and employee
function handleLogin(type) {
    let enteredId, enteredPassword, storageKey, idKey, passwordKey;

    if (type === "customer") {
        enteredId = document.getElementById("customerId")?.value.trim();
        enteredPassword = document.getElementById("customerPassword")?.value.trim();
        storageKey = "customers";
        idKey = "SSN_ID"; // Customer unique identifier
        passwordKey = "Password"; // Ensure correct case
    } else if (type === "employee") {
        enteredId = document.getElementById("employeeId")?.value.trim();
        enteredPassword = document.getElementById("employeePassword")?.value.trim();
        storageKey = "employees";
        idKey = "id"; // Employee unique identifier
        passwordKey = "password"; // Ensure correct case
    }

    // Retrieve stored data from localStorage
    let storedData = JSON.parse(localStorage.getItem(storageKey)) || [];

    console.log("🔍 Stored Data:", storedData);
    console.log("🆔 Entered ID:", enteredId);
    console.log("🔑 Entered Password:", enteredPassword);

    // Find the user in the stored data
    let user = storedData.find(user =>
        user[idKey] === enteredId && user[passwordKey] === enteredPassword
    );

    if (user) {
        console.log("✅ User Found:", user);
        alert("Login successful! Redirecting...");

        // Store the logged-in customer's SSN_ID in localStorage
        if (type === "customer") {
            localStorage.setItem("loggedInCustomerId", user.SSN_ID);
            console.log("Logged-in Customer ID stored:", user.SSN_ID); // Debugging
        }

        let redirectPage = type === "customer" ? "cutdash.html" : "empHome.html";
        window.location.href = redirectPage; // Redirect based on user type
    } else {
        console.log("❌ User Not Found!");
        alert("Invalid ID or Password! Please try again.");
    }
}