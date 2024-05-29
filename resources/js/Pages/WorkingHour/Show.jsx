import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Container} from "@mui/material";

export default function Show({ auth, days, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Otro...</h2>}
        >
            <Head title="List all" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <h3>Testing... { status }</h3>
                </div>

                <Container>
                    {days.map((day, index) => (
                        <Accordion>
                            <AccordionSummary>
                                {day.value}
                                <Button>Add new appointment</Button>
                            </AccordionSummary>
                            <AccordionDetails>

                            </AccordionDetails>
                        </Accordion>
                    ))}

                </Container>
            </div>
        </AuthenticatedLayout>
    )
}
