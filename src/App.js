import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import './App.css';
//import cac nut icon
import { 
  BsSearch,
  BsPencil,BsList,
  BsGrid3X3Gap,
  BsGear,
  BsArrowClockwise,
  BsViewStacked,
  BsPeopleCircle,
  BsFillTrashFill,
  BsFillBellFill  
} from 'react-icons/bs';
import { 
  BiNotepad,
  BiSave 
} from 'react-icons/bi';

import { Home, Reminder, Archive, Trash, Labels, Label } from "./routes";
import LabelBox from "./components/labelBox"

import removeVNTones from './store/removeVNTones'


export default function App() {
  const [isOpenLabelBox, setIsOpenLabelBox] = useState(false)
  const [newLabel, setNewLabel] = useState({
    title: '',
    slug: ''
  })
  const [listLabels, setListLabels] = useState([
    {
      title: 'Test Title',
      slug: 'test-slug'
    }
  ])

  const updateNewLabel = e => {
    const title = e.target.value
    const convertedSlug = (removeVNTones(title))
      .toLowerCase()
      .replace(' ', '-')
    setNewLabel({
      title: title,
      slug: convertedSlug
    })
  }

  const updateListLabels = () => {
    const newListLabels = ([
      ...listLabels,
      newLabel
    ])
    setListLabels(newListLabels)
  }
  //nút menu
  

  return (
    <div>
      <Router>
        {/* thanh nav */}
        <div className="sidebar"> 
        <div className="icon"><i><BsList/></i></div>
        <img className="logo" src={"https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"} width="45px" height="45px" ></img>
          <div ><h3>Keep</h3>
            <form>
              <input  type='text' name='Seach' placeholder='         Tìm kiếm...'></input>
              <button type="submit"><i><BsSearch/></i></button> 
              <button><i className="rightbar"><BsPeopleCircle/></i></button>
              <button><i className="rightbar"><BsGrid3X3Gap/></i></button>
              <button><i className="rightbar"><BsGear/></i></button>
              <button><i className="rightbar"><BsViewStacked/></i></button>
              <button><i className="rightbar"><BsArrowClockwise/></i></button>    
            </form>
        </div>
        </div>
        {/* phan menu danh muc */}
        <div className="menu">
          <ul>
            <li>
            <button><BiNotepad/></button>
              <NavLink className="a " to="/home">Ghi chú</NavLink>
            </li>
            <li>
            <button><BsFillBellFill/></button>
              <NavLink className="a " to="/reminder">Lời nhắc</NavLink>
            </li>
            <li>
              <button><BsPencil/></button>
              <button type="sua" className="a " onClick={() => setIsOpenLabelBox(true)}>Chỉnh sửa nhãn</button>
            </li>
            <Labels listLabels={listLabels} />
            <li>
              <button><BiSave/></button>
              <NavLink className="a " to="/archive">Lưu trữ</NavLink>
            </li>
            <li>
              <button><BsFillTrashFill/></button>
              <NavLink className="a " to="/trash">Thùng rác</NavLink>
            </li>
          </ul>

          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/reminder">
              <Reminder />
            </Route>
            <Route path={`/label/:labelSlug`}>
              <Label />
            </Route>
            <Route path="/archive">
              <Archive />
            </Route>
            <Route path="/trash">
              <Trash />
            </Route>
          </Switch>
        </div>
      </Router>
      {
        isOpenLabelBox &&
        <LabelBox
          updateNewLabel={updateNewLabel}
          updateListLabels={updateListLabels}
          setIsOpenLabelBox={setIsOpenLabelBox} />
      }
    </div>
  );
}