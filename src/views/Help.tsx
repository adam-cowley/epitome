import React from 'react'
import Card from '../components/card'
import Header from '../components/header'
import Report from '../components/reports/Report'
import { reportTypes, } from '../constants'

function ExampleReport(report) {
    let example: any = undefined

    if ( ! report.previewQuery ) {
        example = <Card title={report.text}>Preview coming soon...</Card>
    }
    else {
        example = <Report type={report.value} source='cypher' query={report.previewQuery} />
    }

    return (
        <div className="flex mb-12">
            <div className="w-full lg:w-1/2 flex flex-col justify-between px-2">
                <h3 className="text-lg font-bold pb-4 flex-grow-0">{report.text}</h3>
                <div className="flex flex-grow-0">
                    {report.hint}
                 </div>

                 {report.exampleQuery && <div className="mt-8">
                    <div className="font-xs text-gray-500 font-bold mb-2">Example Query:</div>
                    <pre className="flex-grow-0 border-t border-gray-400 pt-2 text-sm rounded-md bg-gray-100 text-gray-6600">{report.exampleQuery}</pre>
                 </div>}
                 <div className="flex-grow"></div>
            </div>

            <div className="w-full lg:w-1/2 p-2 pb-0">
                {example}
            </div>
        </div>
    )
}

export default function Help() {

    return (
        <div className="flex flex-col w-full">
            <Header
                sectionLink="/help"
                sectionText="Help"
            />

            <div className="container mx-auto text-gray-800">
                <div className="p-8 pb-0">
                    <h2 className="font-bold text-gray-800 mb-4 px-2" style={{fontSize: '2rem'}}>Getting Started</h2>
                </div>

                <div className="p-8">
                    <p className="px-2">
                        <strong>Charts</strong> is a Graph App that allows you to quickly create and share dashboards backed by Neo4j data.
                        Charts allows you to create multiple dashboards and reports using a single connection supplied by Neo4j Desktop.
                    </p>
                </div>

                <div className="p-8">
                    <h2 className="font-bold text-gray-800 mb-12 border-b border-gray-400 pb-4 px-2" style={{fontSize: '1.4rem'}}>Report Types</h2>

                    {reportTypes.map(report => <ExampleReport {...report} />)}


                </div>
            </div>
        </div>
    )
}