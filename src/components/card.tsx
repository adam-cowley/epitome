import React from 'react'
import Tab from './tab'


interface CardTab {
    active?: boolean;
    text: string;
    onClick: () => void;
}

interface CardProps {
    title?: string;
    onTitleClick?: () => void;
    tabs?: CardTab[];
    children: any;
}




export default function Card(props: CardProps) {
    const handleTitleClick = () => {
        props.onTitleClick && props.onTitleClick()
    }

    return (
        <div className="card bg-white shadow-sm rounded-md p-4">
            <div className="card-header border-b border-gray-200 pt-2 flex flex-row align-baseline mb-2">
                <h1 className="card-title text-xl text-gray-700 font-bold pb-4 cursor-pointer" onClick={handleTitleClick}>{ props.title }</h1>
                <div className="card-spacer flex-grow"></div>

                {props.tabs?.map((tab, index) => <Tab key={index} text={tab.text} active={tab.active} onClick={tab.onClick} />)}

            </div>
            <div className="flex flex-col h-64 overflow-auto text-gray-600">
                {props.children}
            </div>
        </div>
    )
}