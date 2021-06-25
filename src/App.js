import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

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

  return (
    <div>
      <Router>
        <div>
          <ul>
            <li>
              <NavLink to="/home">Ghi chú</NavLink>
            </li>
            <li>
              <NavLink to="/reminder">Lời nhắc</NavLink>
            </li>
            <li>
              <button onClick={() => setIsOpenLabelBox(true)}>Chỉnh sửa nhãn</button>
            </li>
            <Labels listLabels={listLabels} />
            <li>
              <NavLink to="/archive">Lưu trữ</NavLink>
            </li>
            <li>
              <NavLink to="/trash">Thùng rác</NavLink>
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