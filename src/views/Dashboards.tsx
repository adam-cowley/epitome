/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../store'
import { addDashboard, deleteDashboard } from '../store/actions'
import Button from '../components/forms/button'
import Modal from '../components/modal'
import Card from '../components/card'


export default function Dashboards({ history }) {
    const dispatch = useDispatch()
    // @ts-ignore
    const dashboards = useSelector((n: RootState) => n.dashboards.dashboards)

    const [ showAddForm, setShowAddForm ] = useState<boolean>(false)
    const [ name, setName ] = useState<string>('')
    const [ description, setDescription ] = useState<string>('')

    const handleShowAddClick = () => {
        setShowAddForm(true)
    }
    const handleAddDashboardClick = () => {
        if ( name !== '' ) {
            dispatch(addDashboard(name, description))
            setName('')
            setDescription('')
            setShowAddForm(false)
        }
    }

    const handleDeleteDashboardClick = id => {
        if ( confirm('Are you sure you want to delete this dashboard?') ) {
            dispatch(deleteDashboard(id))
        }
    }

    const goToDashboard = id => history.push(`/dashboards/${id}`)

    return (
        <div className="flex flex-col w-full">
            <div className="query-header flex flex-row flex-grow-0 bg-white border-b border-gray-300 p-4 mb-4">
                <div className="flex justify-top flex-grow-0 mr-2 py-2">
                    <Link className="block bg-transparent text-lg font-bold focus:outline-none" to="/">
                        <span className="text-blue-600 mr-2">
                        Dashboards
                        </span>
                    </Link>
                </div>

                <div className="flex flex-grow"></div>

                <div className="ml-2">
                    <Button size="sm" colour="blue" text="Add Dashboard" onClick={handleShowAddClick} />
                </div>
            </div>

            <div className="w-full">
                <div className="container m-auto">
                    <div className="flex flex-row flex-wrap pt-8">
                        {dashboards && dashboards.map(dashboard => <div className="w-1/4 p-2" key={dashboard.id}>
                            <Card title={dashboard.name} onTitleClick={() => goToDashboard(dashboard.id)} tabs={ [ { text: 'Delete', onClick: () => handleDeleteDashboardClick(dashboard.id) } ] }>
                                <div className="flex flex-grow">
                                {dashboard.description}
                                </div>
                                <div className="flex flex-grow-0 justify-end">
                                    <Link to={`/dashboards/${dashboard.id}`} className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100">
                                        View Dashboard
                                    </Link>
                                </div>

                            </Card>
                        </div>)}

                        {!dashboards || !dashboards.length && <div className="flex flex-col w-full">
                        <div className="p-12 bg-white w-auto m-auto">
                            <h2 className="font-bold text-xl text-center text-blue-600">Let's get exploring!</h2>
                            <p className="mx-auto my-8 text-center">You can add a new dashboard by clicking the <strong>Add Dashboard</strong> button below</p>
                            <div className="text-center">
                                <Button size="md" colour="blue" text="Add Dashboard" onClick={handleShowAddClick} />
                            </div>
                        </div>
                    </div>}
                    </div>
                </div>
            </div>

            {showAddForm && <Modal title="Add Dashboard" onClose={() => setShowAddForm(false)}>
                <form>
                    <div>
                        <label htmlFor="name" className="block font-bold m-2">Name</label>
                        <input className="w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600" type="text" onChange={e => setName(e.target.value)} placeholder="name" />
                    </div>
                    <div>
                        <label htmlFor="description" className="block font-bold m-2">Description</label>
                        <input className="w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600" type="text" onChange={e => setDescription(e.target.value)} placeholder="description" />
                    </div>

                    <div className="mt-4">
                        <Button text="Add Dashboard" onClick={handleAddDashboardClick} />
                    </div>
                </form>
            </Modal>
            }
        </div>
    )
}