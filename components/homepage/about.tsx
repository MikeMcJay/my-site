'use client'

export default function AboutPanel() {
    return (
        <div className="flex flex-col py-10 gap-5">
            <h3>About</h3>
            <div className="flex flex-row gap-10 items-top">
                <div className="basis-2/3 gap-5">
                    This is where I speak about stuff blah blah blah. This is where I speak about stuff blah blah blah. 
                    This is where I speak about stuff blah blah blah. This is where I speak about stuff blah blah blah.
                    This is where I speak about stuff blah blah blah. This is where I speak about stuff blah blah blah. 
                    This is where I speak about stuff blah blah blah. This is where I speak about stuff blah blah blah.
                </div>
                <div className="flex basis-1/3 justify-center">
                    <img
                        className="h-48 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="MikeMcJay"
                    />
                </div>
            </div>
        </div>
    )
}