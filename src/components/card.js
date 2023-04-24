import React, { useState }  from 'react';


const Card = ({item, iteration}) => {

  const [showingAdditionalDetails, toggleDetailsState] = useState(false);
  
  /**
   * Shorten number to thousands, millions, billions, etc.
   * http://en.wikipedia.org/wiki/Metric_prefix
   *
   * @param {number} num Number to shorten.
   * @param {number} [digits=0] The number of digits to appear after the decimal point.
   * @returns {string|number}
   *
   * @example
   * // returns '12.5k'
   * shortenLargeNumber(12543, 1)
   *
   * @example
   * // returns '-13k'
   * shortenLargeNumber(-12567)
   *
   * @example
   * // returns '51M'
   * shortenLargeNumber(51000000)
   *
   * @example
   * // returns 651
   * shortenLargeNumber(651)
   *
   * @example
   * // returns 0.12345
   * shortenLargeNumber(0.12345)
   */
  function shortenLargeNumber(num, digits) {
    var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
        decimal;
    for(var i=units.length-1; i>=0; i--) {
        decimal = Math.pow(1000, i+1);

        if(num <= -decimal || num >= decimal) {
            return +(num / decimal).toFixed(digits) + units[i];
        }
    }
    return num;
  }

  return(
    <div className={"card"}>
      <h2>{item.company_name}</h2>
      <ul className={"list-1"}>
        <li><span>State</span>{item.company_state}</li>
        <li><span>Employees</span>{item.employee_count}</li>
        <li><span>Year</span>{item.plan_year}</li>
      </ul>
      <div className={"show-trigger"} onClick={() => toggleDetailsState(!showingAdditionalDetails)}>
        {`${showingAdditionalDetails ? 'Less details' : 'More details'}`}
      </div>
      <div className={`additional-details ${showingAdditionalDetails ? 'show' : 'hide'}`}>
        <ul className={"list-2"}>
          <li><span>Premium:</span> ${shortenLargeNumber(item.premium_sum,2)}</li>
          <li><span>Participants:</span> {item.participants_sum}</li>
          <li><span>Broker Commissions:</span> ${shortenLargeNumber(item.broker_commission_sum,2)}</li>
        </ul>
      </div>
    </div>
  )
}
export default Card;