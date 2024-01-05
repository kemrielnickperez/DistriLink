# **DistriLink**
A revolutionized online web system to streamline the business processes and operations involved in Micro, Small, and Medium Enterprises (MSME) in the Philippines. It automates manual, repetitive, and tedious tasks involved in the ordering and payment process of MSMEs and their customers to bring about quantifiable improvements in their business processes, leading to increased customer satisfaction and a more efficient and profitable operation of Philippine MSMEs.


### **Table of Contents**
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Refrences](#references)
- [Project Members](#project-members)




### **Features**
- **Profiles**: Serves as a comprehensive repository of both employees and dealers. Navigate through the lists seamlessly to access and manage essential information. Efficiently view, edit, and confirm details within the dealer profile list. Simultaneously, explore the employee profile list for insights into your team. The Profiles feature provides a centralized hub for quick and effective management of user information.
- **Product Distribution**: Engage in effortless product management through the Product Distribution feature. Similar to a shopping cart, this functionality allows distributors to curate and process product orders for their dealers. Seamlessly navigate through the order form, update, add new items and confirm pending orders as needed. The process is designed for simplicity, ensuring a smooth and intuitive experience for efficient product distribution to designated dealers.
- **Collector Assignment**: Facilitate precision in order fulfillment with Distrilink's Collector Assignment feature. Navigate the system seamlessly to assign collectors to specific orders. This intuitive process empowers distributors to strategically manage and optimize their collector resources. Explore the functionality with clarity, ensuring each collector is efficiently allocated to designated orders, contributing to a streamlined and efficient distribution process.
- **Payment Scheduling**: Effectively manage financial transactions with the Payment Scheduling feature in Distrilink. Navigate the payment scheduling screen to update transaction end dates effortlessly. This feature streamlines the process, providing distributors control over their financial timelines and ensuring a clear and organized payment schedule.

- **Payments**: Effortlessly track and manage payments through the Payments feature in Distrilink. Navigate the payments list screen for a clear overview of financial transactions. Confirm payment collections with ease, ensuring accurate and timely processing. Dive into the direct payment screen for a straightforward experience, free from complexities. Search for orders seamlessly and access payment receipts effortlessly, providing distributors with a comprehensive toolset for efficient financial management.

### **Tech Stack**
- **Backend**
    - **Language**
        - **Java (v 17)**
    - **Framework**
        - **Spring Boot (v 3.1.0)**
    - **Libraries**
        - **[Spring Boot Starter Mail](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-email.html)**: Starter for sending email using Spring Framework's email abstraction.
            - Group ID: org.springframework.boot
            - Artifact ID: spring-boot-starter-mail
        - **[JavaMail API](https://javaee.github.io/javamail/)**: JavaMail API provides a platform-independent and protocol-independent framework to build mail and messaging applications.
            - Group ID: javax.mail
            - Artifact ID: javax.mail-api
            - Version: 1.6.2
        - **[JavaMail Implementation by Sun](https://javaee.github.io/javamail/)** : Implementation of JavaMail API by Sun, required for sending and receiving emails.
            - Group ID: com.sun.mail
            - Artifact ID: javax.mail
            - Version: 1.6.2
        - **[Spring Boot Starter Web](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-developing-web-applications)**: Starter for building web applications using Spring MVC.
            - Group ID: org.springframework.boot
            - Artifact ID: spring-boot-starter-web
        - **[Spring Boot Starter Data MongoDB](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-mongodb)**: Starter for using MongoDB as a backend data store with Spring Data MongoDB.
            - Group ID: org.springframework.boot
            - Artifact ID: spring-boot-starter-data-mongodb
        - **[Spring Boot DevTools](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.devtools)**: Tools for local development, including automatic restarts and live reload of changes.
            - Group ID: org.springframework.boot
            - Artifact ID: spring-boot-devtools
            - Scope: runtime, optional
- **Frontend**
    - **Language:**
        - **TypeScript (v4.9.5)**
    - **React Ecosystem:**
        - **react (v18.2.0):** The React library.
         - **react-autosuggest (v10.1.0):** A React autosuggest component.
         - **react-dom (v18.2.0):** React's package for working with the DOM.
         - **react-router-dom (v6.16.0):** A library for declarative routing in React applications.
         - **react-scripts (v5.0.1):** Scripts and configuration used by Create React App.
         - **react-to-print (v2.14.15):** A React component for printing a portion of the page.
         - **react-toastify (v9.1.3):** A library for adding toasts/notifications in React applications.
    - **UI and Styling:**
        - **@emotion/react (v11.11.1):** Emotion is a CSS-in-JS library for React.
        - **@emotion/styled (v11.11.0):** Styled is a package from Emotion providing a styled component API for React.
        - **@fontsource/inter (v5.0.3):** Fontsource is a package for managing web fonts, and this includes the Inter font.
        - **@mui/icons-material (v5.14.11):** Material-UI icons for React.
        - **@mui/material (v5.14.17):** Material-UI is a React component library that follows Material Design principles.
        - **@mui/styled-engine-sc (v5.12.0):** A styled engine for Material-UI using Styled Components.
        - **@mui/x-data-grid (v6.8.0):** Material-UI's data grid component.
        - **@mui/x-date-pickers (v6.13.0):** Material-UI's date picker components.
        - **styled-components (v5.3.11):** A popular CSS-in-JS library for styling React components.
    - **Testing:**
        - **@testing-library/jest-dom (v5.16.5):** Jest utilities for testing DOM elements.
        - **@testing-library/react (v13.4.0):** Testing utilities for React applications.
        - **@testing-library/user-event (v13.5.0):** Utilities for simulating user events in testing.
    - **Type Definitions:**
        - **@types/jest (v27.5.2):** TypeScript typings for Jest.
        - **@types/node (v16.18.36):** TypeScript typings for Node.js.
        - **@types/react (v18.2.13):** TypeScript typings for React.
        - **@types/react-dom (v18.2.6):** TypeScript typings for ReactDOM.
        - **@types/react-autosuggest (v10.1.8):** TypeScript typings for react-autosuggest.
        - **@types/uuid (v9.0.4):** TypeScript typings for the uuid library.
    - **HTTP Requests:**
        - **axios (v1.5.0):** A promise-based HTTP client for making requests from the browser.
    - **Date and Time Handling:**
        - **date-fns (v2.30.0):** A utility library for working with dates in JavaScript/TypeScript.
        - **dayjs (v1.11.9):** Another library for handling dates and times.
        - **moment (v2.29.4):** A library for parsing, validating, manipulating, and displaying dates and times.
    - **Other Utilities:**
        - **inter (v2.1.0):** A modern, sans-serif font.
        - **uuid (v9.0.1):** A library for generating UUIDs.
        - **web-vitals (v2.1.4):** A library for measuring web performance metrics.
- **Database Management**
    - MongoDB
- **API**
    - RESTful API 
- **Deployment Service**
    -  Microsoft Azure Cloud Platform
- **Tools**
    - Postman    
    - MongoDB Atlas
    - MongoDB Compass


### **Installation**
1. Clone the repository: `https://github.com/charamirez05/DistriLink.git`  
    > GitHub Repository is currently set to private as of December 22, 2023 to protect the source code against malicious intents.
2. Navigate to the project repository: `cd Distrilink`
    - **Frontend Installation**:
        1. Navigate to the Frontend Directory: `cd Frontend\distributorsystem`
        2. Install dependencies: `npm install`
    - **Backend Installation**:
        1. Navigate to the Backend Directory: `cd Backend\DistributorSystem`
        2. Navigate to the directory containing the pom.xml file: `cd path\to\pom.xml`
        3. Install dependencies: `mvn clean install`
3. After installations, you can start the project
    - **Backend Project Execution/Start**:
        1. Navigate to the Backend directory: `cd Backend\DistributorSystem`
        2.Start backend server: `mvn spring-boot:run`
    - **Frontend Project Execution/Start**:
        1. Navigate to the Frontend directory: `cd Frontend\distributorsystem`
        2. Start frontend development server: `npm start`
4. After successfully starting both the backend and frontend, you can access the running DistriLink application through your web browser at http://localhost:3000.

##### Default Usernames and Passwords
- **DistriLink**
    - Distributor
        -   User ID: ***dde00f89***
        -   Password: ***juandc***
    - Employee (Cashier)
        -   User ID: ***8b823498***
        -   Password: ***vi11am0r***
    - Employee (Sales Associate)
        -   User ID: ***ae364565***
        -   Password: ***rancho5g7***
    - Employee (Cashier and Sales Associate)
        -   User ID: ***289029dc***
        -   Password: ***chufelip***
    - Dealer
        -   User ID: ***e62ef582***
        -   Password: ***gloria876***
- **MongoDB Compass**
    - User Name: ***DistriLinkAdmin*** 
    - Password: ***4Nu0nTwIAe9jLGVA*** 
    - URI Connection String: `mongodb+srv://DistriLinkAdmin:4Nu0nTwIAe9jLGVA@distributorsystem.hnskupd.mongodb.net/`

### **References**

- [ClickUp](https://app.clickup.com/9008220744/v/l/7-9008220744-1)
- [GitHub Repository](https://github.com/charamirez05/DistriLink.git)
    > GitHub Repository is currently set to private as of December 22, 2023 to protect the source code against malicious intents.
- [Postman Collection](https://distrilink-g5.postman.co/workspace/G5-Capstone~d84b7dfb-f8b7-459d-8668-9191d20967c8/collection/23487415-d5d198a0-4375-499c-bf2b-e7cb5d6841ab?action=share&creator=23487415)

### **Project Members**
- **Kim Hilary M. Barnaba**
    -   khbarnaba@gmail.com
    -   09923290048
- **Ariel Judah D. Musngi**
    -  arieljudahmusngi@gmail.com
    -  09959617346
- **Ephraim Khirt O. Perez**
    - khirtperez@gmail.com 
    - 09094448875
- **Kemriel Nick S. Perez**
    - kemrielnikperez@gmail.com
    - 09219222005
- **Charmaine Mae I. Ramirez**
    - charmaineramirez05@gmail.com
    - 09158523587