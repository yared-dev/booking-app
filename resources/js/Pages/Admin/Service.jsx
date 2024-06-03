import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, router, useForm} from "@inertiajs/react";
import {useState} from "react";
import {Button} from "@mui/material";

export default function Service({ auth, categories }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors} = useForm({"name": ""})

    function handleCategorySubmit(e) {
        e.preventDefault();

        post('/admin/category', data, {
            preserveState: true,
            onSuccess: () => {
                clearErrors()
                reset("name")
            },
            onError: (error) => {
                console.log(error)
            }
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Service</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleCategorySubmit}>
                        <input type={"text"}
                               value={data.name}
                               onChange={e => setData('name', e.target.value)}/>
                        <button type={"submit"} disabled={processing}>Create</button>
                    </form>
                    {errors && <div>Error: {JSON.stringify(errors)}</div>}
                    {categories.map((category) => (<div key={category.id}>{category.name}</div>))}
                </div>

                <Button>Create Service</Button>

            </div>
        </AuthenticatedLayout>
    );
}
