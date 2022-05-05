# pclub

**Project - Blog Website**

  

> **Tech Stack**
  

**1. Frontend**


The frontend is written in Javascript & CSS.

 
> **Frontend Explanation**

The index.html is the main file which directly links to the home page. ‘Html’ folder contains other html pages for the website. ‘Css’ folder has a styles.css file which has the styling for all the pages for my pages. ‘Js’ folder has a script.js file which provides some functionality to my website.

Home page consists of the following sections-’top-section’, ‘main-body’, ‘secondary-body’, ‘brands’,  ‘about’ and ‘footer’. The ‘top-section’ has a div with class ‘topmost-div’ and a navigation bar within the nav tag. Navigation bar consists of a menu, search bar, brand logo, user icon, wishlist icon and cart icon. For ‘Products’ in the menu, I made a dropdown menu with CSS and JS. The ‘main-body’ section consists of links to different pages for men and women products. The ‘secondary-body’ section has recommendation divs for both men and women. Recommendation div has a product slider made from CSS and JS. All the links in this section are directed to html/men.html and html/women.html. And the ‘brands’, ‘about’ and ‘footer’ sections are self explanatory.

html/men.html and html/women.html files contain filter section on top, categories section on left and products section in the middle. I used flexbox and grid display type to align my divs. html/mProductDetail.html file is linked to all the images in html/men.html and html/women.html files. html/mProductDetail.html file consists of the details of the product. html/signUp.html and html/login.html files are opened when you click the user icon in div and select the respective options in the dropdown menu.

I also used JS event listeners to apply some styling and some responsiveness to the website.


**2. Backtend**


The backend is written in NodeJs, ExpressJs and MongoDB.

 
> **Backend Explanation**

The app.js is the main server file. It is written in ExpresJs. It facilitates loading and redirection to different pages. The wesbite is mainly based on CRUD(Create, Read, Update and Delete) functionalities. Login and register feature is made by using Passport. Admin username: abhinav; password:  



> **Features**

-   Completely Responsive
	-    I used media queries to apply two breakpoints.
