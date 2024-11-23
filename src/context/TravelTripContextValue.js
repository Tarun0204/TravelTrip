import React from 'react'

const TravelTripContextValue = React.createContext({
  myTripsList: [],
  addTripsList: () => {},
})

export default TravelTripContextValue
