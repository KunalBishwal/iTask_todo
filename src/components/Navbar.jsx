import React from 'react'

const Navbar = ({ searchText, setSearchText, filterPriority, setFilterPriority }) => {
  return (
    <nav className='flex flex-col sm:flex-row container bg-purple-800 text-white py-5'>
      <div className='flex items-center justify-between px-4 sm:w-1/3'>
        <div className='logo flex items-center'>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512" 
            height="30" 
            width="30" 
            className="mx-2"
          >
            <path style={{ fill: '#FFE477' }} d="M488.727,186.182h-23.273H253.054H46.545H23.273C10.42,186.182,0,175.762,0,162.909v325.818C0,501.582,10.42,512,23.273,512h229.781h235.674C501.58,512,512,501.582,512,488.727V162.909C512,175.762,501.58,186.182,488.727,186.182z"/>
            <path style={{ fill: '#6E76E5' }} d="M488.727,46.545H356.848h-23.273h-23.273h-57.249h-51.357h-23.273h-23.273H23.273C10.42,46.545,0,56.965,0,69.818v93.091c0,12.853,10.42,23.273,23.273,23.273h23.273h206.508h212.401h23.273c12.853,0,23.273-10.42,23.273-23.273V69.818C512,56.965,501.58,46.545,488.727,46.545z"/>
            <path style={{ fill: '#A78966' }} d="M356.848,46.545V23.273C356.848,10.42,346.428,0,333.576,0s-23.273,10.42-23.273,23.273v23.273h23.273H356.848z"/>
            <path style={{ fill: '#806749' }} d="M201.697,46.545V23.273C201.697,10.42,191.277,0,178.424,0c-12.853,0-23.273,10.42-23.273,23.273v23.273h23.273H201.697z"/>
          </svg>
          <span className='font-bold text-xl mx-2'>iTask</span>
        </div>
      </div>
      
      <div className='flex flex-col sm:flex-row items-center justify-end gap-4 px-4 sm:w-2/3'>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="px-4 py-1 rounded-lg bg-purple-700 text-white placeholder-purple-300 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full sm:w-64"
        />
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-4 py-1 rounded-lg bg-purple-700 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>
    </nav>
  )
}

export default Navbar