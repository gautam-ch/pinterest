import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route} from 'react-router'
import './index.css'
import Mainlayout from './layouts/mainlayout.jsx'
import {QueryClientProvider,QueryClient} from '@tanstack/react-query';

// import Homepage from './routes/homePage/homePage.jsx'
// import AuthPage from './routes/authPage/authPage.jsx'
// import CreatePage from './routes/createPage/createPage.jsx'
// import PostPage from './routes/postPage/postPage.jsx'
// import UserPage from './routes/userPage/userPage.jsx'
// import SearchPage from './routes/searchPage/searchPage.jsx'

const Homepage = React.lazy(()=> import("./routes/homePage/homepage.jsx"));
const AuthPage = React.lazy(()=> import("./routes/authPage/authPage.jsx"));
const CreatePage = React.lazy(()=> import("./routes/createPage/createPage.jsx"));
const PostPage = React.lazy(()=> import("./routes/postPage/postPage.jsx"));
const UserPage = React.lazy(()=> import("./routes/userPage/userPage.jsx"));
const SearchPage = React.lazy(()=> import("./routes/searchPage/searchPage.jsx"));

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
    <BrowserRouter>
     <Routes>
       <Route element={<Mainlayout/>}>
       <Route path='/' element={<Homepage/>} />
       <Route path='/create' element={<CreatePage/>} />
       <Route path='/pin/:id' element={<PostPage/>} />
       <Route path='/search' element={<SearchPage/>} />
       <Route path='/:username' element={<UserPage/>} />
       </Route>
       <Route path='/auth' element={<AuthPage/>} />
      
    </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
