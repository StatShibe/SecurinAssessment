import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App"
import './index.css'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import CVESList from './pages/CVESList'
import CVESInfo from './pages/CVESInfo'

const rootLoader  = () => {
	return redirect("cves/list")
}

const router = createBrowserRouter([
	{
		path : "/",
		element : <App/>,
		loader : rootLoader
	},
	{
		path : "cves/list",
		element : <CVESList/>
	},
	{
		path : "cves/:cvesid",
		element : <CVESInfo/>
	}
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
