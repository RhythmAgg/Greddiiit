import React from 'react'
import { BarChart, Bar,Legend,LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Stats = ({subdetails}) => {
    const data = [
        {
          name: 'data',
          report_count: subdetails.report_count,
          deletedpost_count: subdetails.deletedpost_count,
        }
      ];
  return (
    <div className='reports-container'>
        <div className='flex-item-left d-flex flex-column rounded'>
            <h3 className='text-center flex-fill'>New Members Vs Date</h3>
            <ResponsiveContainer className='flex-fill' height={400}>
                <LineChart data={subdetails.analytics} 
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                    <Line type="monotone" dataKey="newmembers.length" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" tick={{fontSize: '1rem'}}/>
                    <YAxis tick={{fontSize: '1rem'}}/>
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
        <div className='flex-item-left d-flex flex-column rounded'>
            <h3 className='text-center flex-fill'>New Posts vs Date</h3>
            <ResponsiveContainer className='flex-fill' height={400}>
                <LineChart data={subdetails.analytics} 
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                    <Line type="monotone" dataKey="newposts.length" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" tick={{fontSize: '1rem'}}/>
                    <YAxis tick={{fontSize: '1rem'}}/>
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
        <div className='flex-item-left d-flex flex-column rounded'>
            <h3 className='text-center flex-fill'>New Visitors vs Date</h3>
            <ResponsiveContainer className='flex-fill' height={400}>
                <LineChart data={subdetails.analytics} 
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                    <Line type="monotone" dataKey="visitors" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" tick={{fontSize: '1rem'}}/>
                    <YAxis tick={{fontSize: '1rem'}} />
                    <Tooltip tick={{fontSize: '1rem'}}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
        <div className='flex-item-left d-flex flex-column rounded'>
            <h3 className='text-center flex-fill'>Reports vs Deleted Posts</h3>
            <ResponsiveContainer className='flex-fill' height={400}>
            <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey='name' tick={{fontSize: '1rem'}}/>
            <YAxis tick={{fontSize: '1rem'}}/>
            <Tooltip />
            <Legend tick={{fontSize: '1rem'}} />
            <Bar dataKey="report_count" fill="#8884d8" />
            <Bar dataKey="deletedpost_count" fill="#82ca9d" />
          </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
   
   
  )
}

export default Stats
