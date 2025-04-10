// Function to register an employee
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

    // Validate email format
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Validate password match
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    // Validate password strength
    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
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
function registerCustomer() {
    // Get form inputs
    const name = document.getElementById("name")?.value.trim();
    const account = "ACCT" + Math.floor(1000000000 + Math.random() * 9000000000); // Random 10-digit account number
    const ifsc = "BKID10089";
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
    if (!name || !aadhaar || !pan || !dob || !gender || 
        !marital || !email || !contact || !password || !address) 
     {
        alert("Please fill in all required fields.");
        return;
    }

    // Validate email format
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Validate account number
    

    // Validate Aadhaar number (12 digits)
    if (!/^\d{12}$/.test(aadhaar)) {
        alert("Aadhaar number must be 12 digits.");
        return;
    }

    // Validate PAN number
    if (!/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(pan)) {
        alert("Please enter a valid PAN number (format: ABCDE1234F).");
        return;
    }

    // Validate password strength
    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    // Generate a random customer SSN ID
    const ssnId = "CUST" + Math.floor(100000 + Math.random() * 900000);

    // Create customer object
    const customerDetails = {
        ssn: ssnId,
        name,
        accountNumber: account,
        ifsc,
        balance,
        aadhaar,
        pan,
        dob,
        gender,
        maritalStatus: marital,
        email,
        contact,
        password,
        address
    };

    // Retrieve existing customers or initialize empty array
    let customers = JSON.parse(localStorage.getItem("customers")) || [];

    // Check if customer already exists
    if (customers.some(customer => 
        customer.email === email || 
        customer.accountNumber === account ||
        customer.aadhaar === aadhaar ||
        customer.pan === pan
    )) {
        alert("Customer already exists with the same email, account number, Aadhaar, or PAN.");
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

// Function to handle login for both customer and employee
function handleLogin(type) {
    let enteredId, enteredPassword, storageKey, idKey, redirectPage;
    const loginForm = document.getElementById("loginForm");

    if (type === "customer") {
        enteredId = document.getElementById("customerId")?.value.trim();
        enteredPassword = document.getElementById("customerPassword")?.value.trim();
        storageKey = "customers";
        idKey = "ssn";
        redirectPage = "cutdash.html";
    } else if (type === "employee") {
        enteredId = document.getElementById("employeeId")?.value.trim();
        enteredPassword = document.getElementById("employeePassword")?.value.trim();
        storageKey = "employees";
        idKey = "id";
        redirectPage = "empHome.html";
    } else {
        return;
    }

    // Validate inputs
    if (!enteredId || !enteredPassword) {
        alert("Please enter both ID and password");
        return;
    }

    try {
        // Retrieve stored data from localStorage
        const storedData = JSON.parse(localStorage.getItem(storageKey)) || [];

        // Find the user
        const user = storedData.find(user => 
            (user[idKey] === enteredId || user.email === enteredId) && 
            user.password === enteredPassword
        );

        if (user) {
            // Store logged-in user information
            if (type === "customer") {
                localStorage.setItem("loggedInCustomerId", user.ssn);
                localStorage.setItem("loggedInCustomerName", user.name);
                localStorage.setItem("loggedInCustomerBalance", user.balance);
            } else {
                localStorage.setItem("loggedInEmployeeId", user.id);
                localStorage.setItem("loggedInEmployeeName", `${user.firstName} ${user.lastName}`);
            }

            alert("Login successful! Redirecting...");
            window.location.href = redirectPage;
        } else {
            alert("Invalid credentials! Please try again.");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login. Please try again.");
    }
}

// Function to get customer details
function getCustomerDetails(customerId) {
    try {
        const customers = JSON.parse(localStorage.getItem("customers")) || [];
        return customers.find(c => 
            c.ssn === customerId || 
            c.email === customerId ||
            c.accountNumber === customerId
        );
    } catch (error) {
        console.error("Error getting customer details:", error);
        return null;
    }
}

// Function to update customer balance
function updateCustomerBalance(customerId, amount, isCredit = false) {
    try {
        const customers = JSON.parse(localStorage.getItem("customers")) || [];
        const customerIndex = customers.findIndex(c => c.ssn === customerId);
        
        if (customerIndex !== -1) {
            const currentBalance = parseFloat(customers[customerIndex].balance) || 0;
            customers[customerIndex].balance = isCredit ? 
                (currentBalance + amount).toFixed(2) : 
                Math.max(0, (currentBalance - amount)).toFixed(2);
            
            localStorage.setItem("customers", JSON.stringify(customers));
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error updating balance:", error);
        return false;
    }
}

// Helper function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    // Handle employee registration form submission
    const employeeRegistrationForm = document.getElementById("registrationForm");
    if (employeeRegistrationForm) {
        employeeRegistrationForm.addEventListener("submit", function(e) {
            e.preventDefault();
            registerEmployee();
        });
    }

    // Handle customer registration form submission
    const customerRegistrationForm = document.getElementById("customerRegistrationForm");
    if (customerRegistrationForm) {
        customerRegistrationForm.addEventListener("submit", function(e) {
            e.preventDefault();
            registerCustomer();
        });
    }

    // Handle login form submission
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const userType = document.querySelector('input[name="userType"]:checked')?.value;
            if (userType) {
                handleLogin(userType);
            } else {
                alert("Please select user type (Customer or Employee)");
            }
        });
    }

    // Close success popup when clicking the close button
    const closePopup = document.getElementById("closePopup");
    if (closePopup) {
        closePopup.addEventListener("click", function() {
            document.getElementById("successPopup").style.display = "none";
        });
    }
});
