import {Component} from 'react'
import {v4} from 'uuid'
import TravelTripContextValue from '../../context/TravelTripContextValue'

import Header from '../Header'

import './index.css'

const stepsList = [
  {stepId: 'YOUR_DETAILS', displayText: 'Your Details', step: 1},
  {stepId: 'DATE_SELECTION', displayText: 'Date Selection', step: 2},
  {stepId: 'GUESTS', displayText: 'Guests', step: 3},
  {stepId: 'TRAVEL_ASSISTANCE', displayText: 'Travel Assistance', step: 4},
  {stepId: 'CONFIRMATION', displayText: 'Confirmation', step: 5},
]

const travelAssistanceList = [
  {value: 'car', displayText: 'Car'},
  {value: 'flight', displayText: 'Flight'},
  {value: 'bus', displayText: 'Bus'},
  {value: 'train', displayText: 'Train'},
]

class BookNewTrip extends Component {
  state = {
    activeStep: stepsList[0].stepId,
    name: '',
    nameErrMsg: false,
    startLocation: '',
    startLocationErrMsg: false,
    endLocation: '',
    endLocationErrMsg: false,
    startDate: '',
    endDateInput: '',
    startDateErrMsg: false,
    endDateInputErrMsg: false,
    endDateLessThanErr: false,
    adults: 1,
    childrens: 0,
    infants: 0,
    isTravelChecked: false,
    selectedTravel: travelAssistanceList[0].value,
    isCompletedStepList: [],
  }

  render() {
    const {activeStep, isCompletedStepList} = this.state
    return (
      <TravelTripContextValue.Consumer>
        {value => {
          const {addTripList} = value

          const onClickYourDetailsNextBtn = () => {
            const {name, startLocation, endLocation} = this.state
            if (name === '') {
              this.setState({nameErrMsg: true})
            } else if (startLocation === '') {
              this.setState({startLocationErrMsg: true})
            } else if (endLocation === '') {
              this.setState({endLocationErrMsg: true})
            } else {
              this.setState({
                activeStep: stepsList[1].stepId,
                isCompletedStepList: [stepsList[0].stepId],
              })
            }
          }

          const onChangename = event => {
            this.setState({
              nameErrMsg: false,
              name: event.target.value,
            })
          }

          const onChangestartLocation = event => {
            this.setState({
              startLocationErrMsg: false,
              startLocation: event.target.value,
            })
          }

          const onChangeendLocation = event => {
            this.setState({
              endLocationErrMsg: false,
              endLocation: event.target.value,
            })
          }

          const onClickPreviousInDateSelection = () => {
            this.setState(prevState => ({
              activeStep: stepsList[0].stepId,
              isCompletedStepList: prevState.isCompletedStepList.filter(
                eachCompletedList =>
                  eachCompletedList.includes(stepsList[0].stepId) === false,
              ),
            }))
          }

          const onChangeStartDate = event => {
            this.setState({
              startDate: event.target.value,
              startDateErrMsg: false,
            })
            const {startDate} = this.state
            console.log(startDate)
          }

          const onChangeEndDateInput = event => {
            this.setState({
              endDateInput: event.target.value,
              endDateInputErrMsg: false,
            })
          }

          const onClickPreviousInGuestForm = () => {
            this.setState(prevState => ({
              activeStep: stepsList[1].stepId,
              isCompletedStepList: prevState.isCompletedStepList.filter(
                eachCompletedList =>
                  eachCompletedList.includes(stepsList[1].stepId) === false,
              ),
            }))
          }

          const onClickDateSelectionNextBtn = () => {
            const {startDate, endDateInput} = this.state
            const getDifference = startDate < endDateInput
            console.log(getDifference)
            if (startDate === '') {
              this.setState({startDateErrMsg: true})
            } else if (endDateInput === '') {
              this.setState({endDateInputErrMsg: true})
            } else if (!getDifference) {
              this.setState({endDateLessThanErr: true})
            } else {
              this.setState(prevState => ({
                activeStep: stepsList[2].stepId,
                isCompletedStepList: [
                  ...prevState.isCompletedStepList,
                  stepsList[1].stepId,
                ],
              }))
            }
          }

          const onClickAdultsDecreaseBtn = () => {
            const {adults} = this.state
            if (adults > 1) {
              this.setState(prevState => ({
                adults: prevState.adults - 1,
              }))
            }
          }

          const onClickAdultsIncreaseBtn = () => {
            this.setState(prevState => ({
              adults: prevState.adults + 1,
            }))
          }

          const onClickChildrensDecreaseBtn = () => {
            const {childrens} = this.state
            if (childrens > 0) {
              this.setState(prevState => ({
                childrens: prevState.childrens - 1,
              }))
            }
          }

          const onClickChildrensIncreaseBtn = () => {
            this.setState(prevState => ({
              childrens: prevState.childrens + 1,
            }))
          }

          const onClickInfantsDecreaseBtn = () => {
            const {infants} = this.state
            if (infants > 0) {
              this.setState(prevState => ({
                infants: prevState.infants - 1,
              }))
            }
          }

          const onClickInfantsIncreaseBtn = () => {
            this.setState(prevState => ({
              infants: prevState.infants + 1,
            }))
          }

          const onClickGuestNextBtn = () => {
            this.setState(prevState => ({
              activeStep: stepsList[3].stepId,
              isCompletedStepList: [
                ...prevState.isCompletedStepList,
                stepsList[2].stepId,
              ],
            }))
          }

          const onChangeTravelAssistanceCheckbox = () => {
            this.setState(prevState => ({
              isTravelChecked: !prevState.isTravelChecked,
            }))
          }

          const onChangeSelectTripValue = event => {
            this.setState({selectedTravel: event.target.value})
          }

          const onClickPreviousInTravelAssistance = () => {
            this.setState(prevState => ({
              activeStep: stepsList[2].stepId,
              isCompletedStepList: prevState.isCompletedStepList.filter(
                eachCompletedList =>
                  eachCompletedList.includes(stepsList[2].stepId) === false,
              ),
            }))
          }

          const onClickTravelAssistanceNextBtn = () => {
            const {isTravelChecked} = this.state
            if (!isTravelChecked) {
              this.setState(prevState => ({
                activeStep: stepsList[4].stepId,
                isCompletedStepList: [
                  ...prevState.isCompletedStepList,
                  stepsList[3].stepId,
                ],
              }))
            } else {
              this.setState(prevState => ({
                activeStep: stepsList[4].stepId,
                isCompletedStepList: [
                  ...prevState.isCompletedStepList,
                  stepsList[3].stepId,
                ],
              }))
            }
          }

          const onClickCancelBookingBtn = () => {
            this.setState({
              activeStep: stepsList[0].stepId,
              name: '',
              nameErrMsg: false,
              startLocation: '',
              startLocationErrMsg: false,
              endLocation: '',
              endLocationErrMsg: false,
              startDate: '',
              endDateInput: '',
              startDateErrMsg: false,
              endDateInputErrMsg: false,
              adults: 1,
              childrens: 0,
              infants: 0,
              isTravelChecked: false,
              selectedTravel: travelAssistanceList[0].value,
              isCompletedStepList: [],
            })
          }

          const onClickConfirmBookingBtn = () => {
            const {endLocation, startDate, endDateInput} = this.state
            const tripsDetails = {
              id: v4(),
              endLocation,
              startDate,
              endDate: endDateInput,
            }
            this.setState(prevState => ({
              activeStep: '',
              isCompletedStepList: [
                ...prevState.isCompletedStepList,
                stepsList[4].stepId,
              ],
            }))
            addTripList(tripsDetails)
          }

          const onClickBookANewTrip = event => {
            event.preventDefault()
            this.setState({
              activeStep: stepsList[0].stepId,
              name: '',
              nameErrMsg: false,
              startLocation: '',
              startLocationErrMsg: false,
              endLocation: '',
              endLocationErrMsg: false,
              startDate: '',
              endDateInput: '',
              startDateErrMsg: false,
              endDateInputErrMsg: false,
              adults: 1,
              childrens: 0,
              infants: 0,
              isTravelChecked: false,
              selectedTravel: travelAssistanceList[0].value,
              isCompletedStepList: [],
            })
          }

          const onSubmitGuestForm = event => {
            event.preventDefault()
          }

          const onSubmitYourDetailsForm = event => {
            event.preventDefault()
          }

          const onSubmitDateSelectionForm = event => {
            event.preventDefault()
          }

          const onSubmitTravelAssistanceForm = event => {
            event.preventDefault()
          }

          const onSubmitConfirmationPage = event => {
            event.preventDefault()
          }

          // Your Details Step

          const renderYourDetailsForm = () => {
            const {
              nameErrMsg,
              startLocationErrMsg,
              endLocationErrMsg,
              name,
              startLocation,
              endLocation,
            } = this.state
            return (
              <form
                onSubmit={onSubmitYourDetailsForm}
                className="your-details-container"
              >
                <h1 className="your-details-heading">Travel Trip</h1>
                <h1 className="your-details-heading">Your Details</h1>
                <p className="your-details-description">
                  Enter your name and location details
                </p>
                <div className="your-details-form-container">
                  <label className="your-details-label-text" htmlFor="name">
                    Name
                  </label>
                  {!nameErrMsg && (
                    <div className="your-details-input-container">
                      <input
                        value={name}
                        onChange={onChangename}
                        placeholder="Enter name"
                        className="your-details-input-field"
                        id="name"
                        type="text"
                      />
                    </div>
                  )}
                  {nameErrMsg && (
                    <>
                      <div className="your-details-input-container-err">
                        <input
                          value={name}
                          onChange={onChangename}
                          placeholder="Enter name"
                          className="your-details-input-field-err"
                          id="name"
                          type="text"
                        />
                      </div>
                      <p className="name-err-text">Enter your name</p>
                    </>
                  )}

                  <label
                    className="your-details-label-text"
                    htmlFor="startLocation"
                  >
                    Start location
                  </label>
                  {!startLocationErrMsg && (
                    <div className="your-details-input-container">
                      <input
                        value={startLocation}
                        onChange={onChangestartLocation}
                        placeholder="Enter Start Location"
                        className="your-details-input-field"
                        id="startLocation"
                        type="text"
                      />
                    </div>
                  )}
                  {startLocationErrMsg && (
                    <>
                      <div className="your-details-input-container-err">
                        <input
                          value={startLocation}
                          onChange={onChangestartLocation}
                          placeholder="Enter Start Location"
                          className="your-details-input-field-err"
                          id="startLocation"
                          type="text"
                        />
                      </div>
                      <p className="name-err-text">Enter your start location</p>
                    </>
                  )}
                  <label
                    className="your-details-label-text"
                    htmlFor="endLocation"
                  >
                    End location
                  </label>
                  {!endLocationErrMsg && (
                    <div className="your-details-input-container">
                      <input
                        value={endLocation}
                        onChange={onChangeendLocation}
                        placeholder="Enter End Location"
                        className="your-details-input-field"
                        id="endLocation"
                        type="text"
                      />
                    </div>
                  )}
                  {endLocationErrMsg && (
                    <>
                      <div className="your-details-input-container-err">
                        <input
                          value={endLocation}
                          onChange={onChangeendLocation}
                          placeholder="Enter End Location"
                          className="your-details-input-field-err"
                          id="sendLocation"
                          type="text"
                        />
                      </div>
                      <p className="name-err-text">Enter your End Location</p>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={onClickYourDetailsNextBtn}
                    className="your-details-next-button"
                  >
                    Next
                  </button>
                </div>
              </form>
            )
          }

          // Date Selection Step
          const renderDateSelectionForm = () => {
            const {
              startDate,
              endDateInput,
              startDateErrMsg,
              endDateInputErrMsg,
              endDateLessThanErr,
            } = this.state
            return (
              <form
                onSubmit={onSubmitDateSelectionForm}
                className="your-details-container"
              >
                <h1 className="your-details-heading">Date Selection</h1>
                <p className="your-details-description">
                  Select your Start and End Date.
                </p>
                <div className="your-details-form-container">
                  <label
                    className="your-details-label-text"
                    htmlFor="startDate"
                  >
                    Start Date
                  </label>
                  {startDateErrMsg ? (
                    <>
                      <input
                        onChange={onChangeStartDate}
                        id="startDate"
                        className="date-input-field-err-msg"
                        type="date"
                        value={startDate}
                      />
                      <p className="start-date-err-msg">Select start date</p>
                    </>
                  ) : (
                    <input
                      onChange={onChangeStartDate}
                      id="startDate"
                      className="date-input-field"
                      type="date"
                      value={startDate}
                    />
                  )}
                  <label className="your-details-label-text" htmlFor="endDate">
                    End Date
                  </label>
                  {endDateInputErrMsg || endDateLessThanErr ? (
                    <>
                      <input
                        onChange={onChangeEndDateInput}
                        id="endDate"
                        className="date-input-field-err-msg"
                        type="date"
                        value={endDateInput}
                      />
                      {endDateInputErrMsg && (
                        <p className="start-date-err-msg">Select end date</p>
                      )}
                      {endDateLessThanErr && (
                        <p className="start-date-err-msg">
                          The end date cannot be less than the start date
                        </p>
                      )}
                    </>
                  ) : (
                    <input
                      onChange={onChangeEndDateInput}
                      id="endDate"
                      className="date-input-field"
                      type="date"
                      value={endDateInput}
                    />
                  )}
                  <div className="button-container">
                    <button
                      onClick={onClickPreviousInDateSelection}
                      type="button"
                      className="date-previous-btn"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={onClickDateSelectionNextBtn}
                      className="your-details-next-button"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>
            )
          }

          // Guests Selection Step
          const renderGuestForm = () => {
            const {adults, childrens, infants} = this.state
            return (
              <form
                onSubmit={onSubmitGuestForm}
                className="your-details-container"
              >
                <h1 className="your-details-heading">Guests</h1>
                <p className="your-details-description">Select your guests</p>
                <div className="your-details-form-container">
                  <div className="adults-guest-container">
                    <div className="adults-content-container">
                      <p className="adults-text">Adults</p>
                      <p className="adults-category-description">
                        Age 13 or above
                      </p>
                    </div>
                    <div className="increase-decrease-container">
                      <button
                        onClick={onClickAdultsDecreaseBtn}
                        className="decrease-button"
                        type="button"
                      >
                        -
                      </button>
                      <p className="adults-count-text">{adults}</p>
                      <button
                        onClick={onClickAdultsIncreaseBtn}
                        className="decrease-button"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <hr className="adults-bottom-horizontal-line" />

                  <div className="adults-guest-container">
                    <div className="adults-content-container">
                      <p className="adults-text">Children</p>
                      <p className="adults-category-description">Age 2-12</p>
                    </div>
                    <div className="increase-decrease-container">
                      <button
                        onClick={onClickChildrensDecreaseBtn}
                        className="decrease-button"
                        type="button"
                      >
                        -
                      </button>
                      <p className="adults-count-text">{childrens}</p>
                      <button
                        onClick={onClickChildrensIncreaseBtn}
                        className="decrease-button"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <hr className="adults-bottom-horizontal-line" />

                  <div className="adults-guest-container">
                    <div className="adults-content-container">
                      <p className="adults-text">Infants</p>
                      <p className="adults-category-description">Under 2</p>
                    </div>
                    <div className="increase-decrease-container">
                      <button
                        onClick={onClickInfantsDecreaseBtn}
                        className="decrease-button"
                        type="button"
                      >
                        -
                      </button>
                      <p className="adults-count-text">{infants}</p>
                      <button
                        onClick={onClickInfantsIncreaseBtn}
                        className="decrease-button"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="button-container">
                    <button
                      onClick={onClickPreviousInGuestForm}
                      type="button"
                      className="date-previous-btn"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={onClickGuestNextBtn}
                      className="your-details-next-button"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>
            )
          }

          // Travel Assistance
          const renderTravelAssistanceForm = () => {
            const {isTravelChecked, selectedTravel} = this.state

            return (
              <form
                onSubmit={onSubmitTravelAssistanceForm}
                className="your-details-container"
              >
                <h1 className="your-details-heading">Travel Assistance</h1>
                <p className="your-details-description">
                  Select your Travel Assistance.
                </p>
                <div className="your-details-form-container">
                  <div className="checkbox-container">
                    {isTravelChecked ? (
                      <input
                        className="input-checkbox"
                        checked
                        onChange={onChangeTravelAssistanceCheckbox}
                        id="checkbox"
                        type="checkbox"
                      />
                    ) : (
                      <input
                        className="input-checkbox"
                        onChange={onChangeTravelAssistanceCheckbox}
                        id="checkbox"
                        type="checkbox"
                      />
                    )}
                    <label className="checkbox-label" htmlFor="checkbox">
                      Travel Assistance Needed
                    </label>
                  </div>
                  {isTravelChecked && (
                    <div className="select-container">
                      <label className="select-label" htmlFor="select">
                        Travel Assistance
                      </label>
                      <select
                        id="select"
                        className="select-input"
                        onChange={onChangeSelectTripValue}
                        value={selectedTravel}
                      >
                        {travelAssistanceList.map(eachTravel => (
                          <option
                            value={eachTravel.displayText}
                            key={eachTravel.value}
                          >
                            {eachTravel.displayText}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="button-container">
                    <button
                      onClick={onClickPreviousInTravelAssistance}
                      type="button"
                      className="date-previous-btn"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={onClickTravelAssistanceNextBtn}
                      className="your-details-next-button"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>
            )
          }

          // Confirmation Page
          const renderConfirmationForm = () => {
            const {
              name,
              startLocation,
              endLocation,
              startDate,
              endDateInput,
              adults,
              childrens,
              infants,
              selectedTravel,
            } = this.state
            return (
              <form
                onSubmit={onSubmitConfirmationPage}
                className="your-details-container"
              >
                <h1 className="your-details-heading">Confirmation</h1>
                <p className="your-details-description">Confirm your details</p>
                <div className="your-details-form-container">
                  <div className="confirmation-name-container">
                    <p className="name-heading">Name:</p>
                    <p className="confirmed-name">{name}</p>
                  </div>
                  <div className="confirmation-name-container">
                    <p className="name-heading">Start Location:</p>
                    <p className="confirmed-name">{startLocation}</p>
                  </div>
                  <div className="confirmation-name-container">
                    <p className="name-heading">End Location:</p>
                    <p className="confirmed-name">{endLocation}</p>
                  </div>
                  <div className="confirmation-name-container">
                    <p className="name-heading">Start Date:</p>
                    <p className="confirmed-name">{startDate}</p>
                  </div>
                  <div className="confirmation-name-container">
                    <p className="name-heading">End Date:</p>
                    <p className="confirmed-name">{endDateInput}</p>
                  </div>
                  <div className="confirmation-name-container">
                    <p className="name-heading">Guests:</p>
                    <p className="confirmed-name">
                      {adults + childrens + infants}
                    </p>
                  </div>
                  <div className="confirmation-name-container">
                    <p className="name-heading">Travel Assistance:</p>
                    <p className="confirmed-name">{selectedTravel}</p>
                  </div>
                  <div className="button-container">
                    <button
                      onClick={onClickCancelBookingBtn}
                      type="button"
                      className="date-previous-btn"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={onClickConfirmBookingBtn}
                      className="your-details-next-button"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </form>
            )
          }

          // Confirmed Page
          const renderConfirmedBookingForm = () => (
            <div className="confirmed-form-container-lg">
              <form
                onSubmit={onClickBookANewTrip}
                className="confirmed-page-container"
              >
                <img
                  className="confirmed-image"
                  src="https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png"
                  alt="success"
                />
                <h1 className="awesome-text">Awesome!</h1>
                <p className="booking-confirmed-description">
                  Your booking has been confirmed.
                </p>
                <button className="book-a-new-trip-button" type="submit">
                  Book a New Trip
                </button>
              </form>
            </div>
          )

          const renderBookNowSteps = () => {
            switch (activeStep) {
              case stepsList[0].stepId:
                return renderYourDetailsForm()
              case stepsList[1].stepId:
                return renderDateSelectionForm()
              case stepsList[2].stepId:
                return renderGuestForm()
              case stepsList[3].stepId:
                return renderTravelAssistanceForm()
              case stepsList[4].stepId:
                return renderConfirmationForm()
              default:
                return renderConfirmedBookingForm()
            }
          }
          return (
            <div className="book-a-new-trip-container-sm">
              <Header className="header" />
              <div className="book-a-new-trip-content-container">
                <div className="book-a-new-trip-steps-container-lg">
                  <div className="left-container-lg">
                    <ul className="steps-list-container-lg">
                      {stepsList.map(eachStep => {
                        const SelectedBackgroundColor =
                          eachStep.stepId === activeStep
                            ? 'steps-count-lg steps-selected-count-lg'
                            : 'steps-count-lg'
                        const selectedDisplayTextColor =
                          eachStep.stepId === activeStep
                            ? 'steps-display-text-lg steps-selected-display-text-lg'
                            : 'steps-display-text-lg'
                        const isCompleted = isCompletedStepList.includes(
                          eachStep.stepId,
                        )
                        return (
                          <li
                            className="steps-list-item-lg"
                            key={eachStep.stepId}
                          >
                            {isCompleted ? (
                              <img
                                className="completed-img"
                                src="https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png"
                                alt={eachStep.displayText}
                              />
                            ) : (
                              <p className={SelectedBackgroundColor}>
                                {eachStep.step}
                              </p>
                            )}
                            <p className={selectedDisplayTextColor}>
                              {eachStep.displayText}
                            </p>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div className="right-container-lg">
                    {renderBookNowSteps()}
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </TravelTripContextValue.Consumer>
    )
  }
}

export default BookNewTrip
