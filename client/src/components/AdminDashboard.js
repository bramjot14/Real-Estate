// import React, { useState } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [title, setTitle] = useState('');
//   const [location, setLocation] = useState('');
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLongitude] = useState('');
//   const [price, setPrice] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Use Google Maps Geocoding API to fetch coordinates for the given address
//       const geocodeResponse = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=YOUR_GOOGLE_MAPS_API_KEY`
//       );

//       const { lat, lng } = geocodeResponse.data.results[0].geometry.location;

//       // Update latitude and longitude in state
//       setLatitude(lat);
//       setLongitude(lng);

//       // Submit the property details to the backend
//       const response = await axios.post('http://localhost:5002/api/properties', {
//         title,
//         location,
//         latitude: lat,
//         longitude: lng,
//         price
//       });

//       setSuccessMessage('Property submitted successfully!');
//       setErrorMessage('');
//     } catch (error) {
//       console.error('Error submitting property:', error);
//       setErrorMessage('Error submitting property. Please check your inputs.');
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Dashboard - Property Management</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title</label>
//           <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
//         </div>

//         <div>
//           <label>Location</label>
//           <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
//         </div>

//         <div>
//           <label>Price</label>
//           <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
//         </div>

//         <button type="submit">Submit Property</button>
//       </form>

//       {successMessage && <p>{successMessage}</p>}
//       {errorMessage && <p>{errorMessage}</p>}
//     </div>
//   );
// };

// export default AdminDashboard;










import React, { useState } from 'react';
import BlogManagement from './BlogManagement';  // Blog management component
import PropertyManagement from './PropertyManagement';  // Property management component

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('blogs');

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard - Manage Content</h2>
      <div className="btn-group mb-4">
        <button
          className={`btn btn-primary ${activeTab === 'blogs' ? 'active' : ''}`}
          onClick={() => setActiveTab('blogs')}
        >
          Manage Blogs
        </button>
        <button
          className={`btn btn-primary ${activeTab === 'properties' ? 'active' : ''}`}
          onClick={() => setActiveTab('properties')}
        >
          Manage Property Listings
        </button>
      </div>

      {activeTab === 'blogs' ? (
        <BlogManagement />  // Render blog management UI
      ) : (
        <PropertyManagement />  // Render property management UI
      )}
    </div>
  );
};

export default AdminDashboard;









// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import BlogManagement from './BlogManagement';  // Import BlogManagement component
// import PropertyManagement from './PropertyManagement';  // Import PropertyManagement component

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('blogs');  // State to manage the active tab (blogs or properties)
  
//   const [blogs, setBlogs] = useState([]);
//   const [title, setTitle] = useState('');
//   const [summary, setSummary] = useState('');
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState(null);  // New state for handling image file
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');  // To capture and display errors

//   // Fetch blogs from the backend
//   const fetchBlogs = async () => {
//     try {
//       const response = await axios.get('http://localhost:5002/api/blogs');
//       setBlogs(response.data);
//     } catch (error) {
//       console.error('Error fetching blogs:', error);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   // Handle blog deletion
//   const handleDelete = async (blogId) => {
//     try {
//       await axios.delete(`http://localhost:5002/api/blogs/${blogId}`);
//       setSuccessMessage('Blog deleted successfully!');
//       fetchBlogs();  // Refresh the blog list after deletion
//     } catch (error) {
//       console.error('Error deleting blog:', error);
//     }
//   };

//   // Handle blog submission (including image)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('summary', summary);
//     formData.append('content', content);
//     if (image) {
//       formData.append('image', image);  // Append image file to the FormData
//     }
  
//     try {
//       const response = await axios.post('http://localhost:5002/api/blogs', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',  // Ensure form-data content type
//         },
//       });
//       setSuccessMessage('Blog submitted successfully');
//       setErrorMessage('');
//     } catch (error) {
//       console.error('Error submitting blog:', error);
//       setErrorMessage('Error submitting blog. Please check if the backend is correctly configured.');
//     }
//   };
  
//   return (
//     <div className="container mt-5">
//       <h2>Admin Dashboard</h2>

//       {/* Buttons for switching between "Blogs" and "Property Listings" */}
//       <div className="btn-group mb-4">
//         <button
//           className={`btn btn-primary ${activeTab === 'blogs' ? 'active' : ''}`}
//           onClick={() => setActiveTab('blogs')}
//         >
//           Manage Blogs
//         </button>
//         <button
//           className={`btn btn-primary ${activeTab === 'properties' ? 'active' : ''}`}
//           onClick={() => setActiveTab('properties')}
//         >
//           Manage Property Listings
//         </button>
//       </div>

//       {/* Conditionally render based on the active tab */}
//       {activeTab === 'blogs' ? (
//         <div>
//           <h3>Blog Management</h3>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="title" className="form-label">Blog Title</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="summary" className="form-label">Blog Summary</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="summary"
//                 value={summary}
//                 onChange={(e) => setSummary(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="content" className="form-label">Blog Content</label>
//               <textarea
//                 className="form-control"
//                 id="content"
//                 rows="5"
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 required
//               />
//             </div>

//             {/* File input for uploading an image */}
//             <div className="mb-3">
//               <label htmlFor="image" className="form-label">Upload Blog Image</label>
//               <input
//                 type="file"
//                 className="form-control"
//                 id="image"
//                 onChange={(e) => setImage(e.target.files[0])}  // Store the selected image
//               />
//             </div>

//             <button type="submit" className="btn btn-primary">Submit Blog</button>
//           </form>

//           {successMessage && <p className="mt-3 text-success">{successMessage}</p>}
//           {errorMessage && <p className="mt-3 text-danger">{errorMessage}</p>}  {/* Display any error message */}

//           <h3 className="mt-5">Submitted Blogs</h3>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Image</th> {/* Add a column to display the image */}
//                 <th>Author</th>
//                 <th>Date</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {blogs.map((blog) => (
//                 <tr key={blog.id}>
//                   <td>{blog.title}</td>
//                   <td>
//                     {blog.image_url ? (
//                       <img
//                         src={`http://localhost:5002${blog.image_url}`}  // Display the image
//                         alt={blog.title}
//                         style={{ width: '100px', height: 'auto' }}  // Thumbnail size
//                       />
//                     ) : (
//                       'No Image'
//                     )}
//                   </td>
//                   <td>{blog.author}</td>
//                   <td>{new Date(blog.created_at).toLocaleDateString()}</td>
//                   <td>
//                     <button className="btn btn-warning">Edit</button>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => handleDelete(blog.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <PropertyManagement />  // Render PropertyManagement component
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [title, setTitle] = useState('');
//   const [summary, setSummary] = useState('');  // Add summary state
//   const [content, setContent] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const fetchBlogs = async () => {
//     try {
//       const response = await axios.get('http://localhost:5002/api/blogs');
//       setBlogs(response.data);
//     } catch (error) {
//       console.error('Error fetching blogs:', error);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5002/api/blogs', { title, summary, content });
//       setSuccessMessage('Blog submitted successfully!');
//       setTitle('');
//       setSummary('');  // Clear summary after submission
//       setContent('');
//       fetchBlogs();  // Refresh the blogs list after adding a new blog
//     } catch (error) {
//       console.error('Error submitting blog:', error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Admin Dashboard - Blog Management</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="title" className="form-label">Blog Title</label>
//           <input
//             type="text"
//             className="form-control"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="summary" className="form-label">Blog Summary</label>
//           <input
//             type="text"
//             className="form-control"
//             id="summary"
//             value={summary}
//             onChange={(e) => setSummary(e.target.value)}  // Update the summary state
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="content" className="form-label">Blog Content</label>
//           <textarea
//             className="form-control"
//             id="content"
//             rows="5"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">Submit Blog</button>
//       </form>

//       {successMessage && <p className="mt-3 text-success">{successMessage}</p>}

//       <h3 className="mt-5">Submitted Blogs</h3>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Author</th>
//             <th>Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {blogs.map((blog) => (
//             <tr key={blog.id}>
//               <td>{blog.title}</td>
//               <td>{blog.author}</td>
//               <td>{new Date(blog.created_at).toLocaleDateString()}</td>
//               <td>
//                 <button className="btn btn-warning">Edit</button>
//                 <button className="btn btn-danger">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminDashboard;
