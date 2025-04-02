import { useState } from 'react'
import './App.css'
import { EditableInfoCard } from './components/EditableInfoCard'

import { Info } from './utils/types';

export const sampleInfo: Info = {
  name: {
    firstName: "Aoife",
    lastName: "O'Connor"
  },
  email: "aoife.oconnor@example.ie",
  links: [
    {
      url: "https://linkedin.com/in/aoife-oconnor",
      name: "LinkedIn"
    },
    {
      url: "https://github.com/aoconnor",
      name: "GitHub"
    },
    {
      url: "https://aoifeoc.com",
      name: "Personal Website",
    }
  ],
  number: {
    countryCode: "353",
    number: "871234567"
  },
  address: {
    line1: "14 Oakwood Drive",
    line2: "Swords",
    town: "Dublin",
    county: "Dublin",
    eircode: "A94 X2Y7",
    country: "Ireland"
  }
};

function App() {

  const [userInfo, setUserInfo] = useState<Info>(sampleInfo);

  return (
    <div className='bg-yellow-100'>
      <EditableInfoCard
        info={userInfo}
        onSave={(updatedInfo) => {
          console.log('Saving:', updatedInfo);
          setUserInfo(updatedInfo);
        }}
      />
    </div>
  )
}

export default App
