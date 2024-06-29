import { ButtonCustom } from "../button";

export default function ContactPanel() {
    return (
        <div className="flex flex-col gap-5 items-center pt-10">
            <h2>Reach out</h2>
            <p className="w-96 text-center">Reasons why you can get in touch with me. What I might be able to offer you and
                all that other good stuff. Some more stuff too.
            </p>
            <ButtonCustom>Contact me</ButtonCustom>
        </div>
    )
}