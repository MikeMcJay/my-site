'use client'

export default function AboutPanel() {
    return (
        <div className="p-28">
            <div className="flex flex-row gap-10 items-top">
                <div className="flex flex-col basis-2/3 gap-5">
                    <h3>About</h3>
                    This is where I speak about stuff blah blah blah. This is where I speak about stuff blah blah blah. 
                    This is where I speak about stuff blah blah blah. This is where I speak about stuff blah blah blah.
                    This is where I speak about stuff blah blah blah. This is where I speak about stuff blah blah blah. 
                    This is where I speak about stuff blah blah blah. This is where I speak about stuff blah blah blah.
                </div>
                <div className="basis-1/3">
                <img
                    className="h-50 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="MikeMcJay"
                />
                </div>
            </div>
        </div>
    )
}