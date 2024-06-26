import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRouter } from 'next/dist/client/router';
import { format } from 'date-fns'
import InfoCard from '../components/InfoCard'
import Map from '../components/Map';


function search({searchResults}) {
  
  const router = useRouter();
  
  // ES6 destructuration
  //Either you put an ';' after each const func, either you dont because it'll not work if u do so

  const { location, startDate, endDate, nbGuests} = router.query;

  const formatedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formatedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formatedStartDate} - ${formatedEndDate}`;

  console.log(range);

  return (
    <div>
        <Header placeholder={`${location} | ${range} | ${nbGuests} guests`}/>

        <main className='flex'>
            <section className='flex-grow pt-14 px-6'>
                <p className='text xs'>300+ stays - {range} - for {nbGuests} Guests</p>
                <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>

                <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                    <p className='button'>Cancellation Flexibility</p>
                    <p className='button'>Type of place</p>
                    <p className='button'>Sheeeesh</p>
                </div>

                <div className='flex flex-col'>
                {searchResults.map(({ img, location, title, description, star, price, total }) => (
                  <InfoCard
                    key={img}
                    img={img}
                    location={location}
                    title={title}
                    description={description}
                    star={star}
                    price={price}
                    total={total}
                  
                  />
                ))}
                </div>

            </section>

            <section className='hidden xl:inline-flex xl:min-w-[600px]'>
              <Map searchResults={searchResults} />
            </section>
        </main>

        <Footer />
    </div>
  )
}

export default search

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(res => res.json());

  return{
    props: {
      searchResults,
    }
  };
}