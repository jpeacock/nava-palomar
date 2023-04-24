import React, { useState, useEffect }  from 'react';
import Card from "./card";

const Listing = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [listing, setListing] = useState([]);
    const [originalListing, setOriginalListing] = useState([]);

    const setSearchTerm = (value) => {
      let filteredListing = [...originalListing];
      if (value.length > 0){
        filteredListing = filteredListing.filter(item => {
          
          const year = item.plan_year ? String(item.plan_year) : ``;
          const name = item.company_name ? item.company_name : ``;
          if (
            year.toLowerCase().includes(value.toLowerCase()) ||
            name.toLowerCase().includes(value.toLowerCase())
          ) {
            return item;
          }
        });
      }
      setListing(filteredListing); 
    }
    
    useEffect(() => {
        fetch("https://gist.githubusercontent.com/gyermich/6ca0c6601932bae50d3c6eb75481d302/raw/416ab16e087fbc14c0a517aa8da7a9873c38dd1e/companies.json")
            .then(res => res.json())
            .then(
                (data) => {
                  setIsLoaded(true);
                  data.sort((a,b) => (a.company_name > b.company_name) ? 1 : ((b.company_name > a.company_name) ? -1 : 0))
                  setOriginalListing(data);
                  setListing(data);
                },
                (error) => {
                  setIsLoaded(true);
                  setError(error);
                }
            )
      }, [])
    if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

          const cards = listing.map(( item, iteration ) => (
            
              <Card
                key={`${item.ein}-${iteration}`}
                item={item}
                iteration={iteration}
              />
            
          ));
          
          return(
              <div className={"content"}>
                <header>
                  <h1>Mini Palomar</h1>
                  <div>
                    <span>Results:</span> {listing.length}
                  </div>
                </header>

                <form>
                  <input
                    type={"text"}
                    className={"search-field"}
                    placeholder={"Type to filter by year, company name or state"}
                    onChange={e => {
                      setSearchTerm(e.target.value);
                    }}
                    onKeyDown={e => {
                      e.stopPropagation();
                    }}
                    autoFocus
                  />
                </form>

                <div className={"cards"}>
                  {cards}
                </div>
                
              </div>
            );
        }
    }
export default Listing;