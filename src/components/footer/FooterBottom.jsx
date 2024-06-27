import React from 'react'
import { footerBottomItem } from '../../constants'

function FooterBottom() {
  return (
    <div className="w-full bg-[#131A22] py-8 ">
      <div className="max-w-5xl mx-auto">
        <div className="w-full grid grid-cols-3 md:grid-cols-5 mdl:grid-cols-6 lgl:grid-cols-7 gap-3 place-content-center text-gray-400 px-5">
          {
            footerBottomItem.map((item)=>(
              <div className='group' key={item.id} >
                <h3 className="footerBottomTitle">{item.title}</h3>
                <p className="footerBottomText">{item.content}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default FooterBottom