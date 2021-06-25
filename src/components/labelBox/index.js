import './labelBox.style.css'

export default function LabelBox({ updateNewLabel, updateListLabels, setIsOpenLabelBox }) {
    return (
        <div>
            <p><b>Chỉnh sửa nhãn</b></p>
            <p title="Hủy">X</p>
            <input placeholder="Tạo nhãn mới" onChange={updateNewLabel} />
            <p title="Tạo nhãn">
                <button onClick={updateListLabels}>V</button>
            </p>
            <button onClick={() => setIsOpenLabelBox(false)}>Xong</button>
        </div>
    )
}