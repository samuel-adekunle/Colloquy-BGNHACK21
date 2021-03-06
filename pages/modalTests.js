import { useState } from "react";
export default function modalTests() {
  const [toggle, setToggle] = useState(true)
  const [name, setName] = useState('test')

  return (<div>
    {toggle ? (
    <p
      onDoubleClick={() => {
        setToggle(false)
      }}
    >{name}</p>
  ) : (
    <input
      type="text"
      value={name}
      onChange={(e) => {
        setName(e.target.value)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
          setToggle(true)
          event.preventDefault()
          event.stopPropagation()
        }
      }}
    />
  )}
</div>)

}