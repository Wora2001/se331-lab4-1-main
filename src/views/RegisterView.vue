<script setup lang="ts">
import InputText from '@/components/InputText.vue';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';
import { useMessageStore } from '@/stores/message';

const messageStore = useMessageStore();
const authStore = useAuthStore();

// Update validation schema to include first name, last name, email, and password
const validationSchema = yup.object({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

// Initialize form with validation
const { errors, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
    },
});

// Define fields
const { value: firstname } = useField<string>('firstname');
const { value: lastname } = useField<string>('lastname');
const { value: email } = useField<string>('email');
const { value: username } = useField<string>('username');
const { value: password } = useField<string>('password');

// Handle form submission
const onSubmit = handleSubmit((values) => {
    authStore.register(values.firstname, values.lastname, values.email,values.username, values.password)
    .then(() => {
        // Redirect after successful registration
        router.push({ name: 'login' });
    }).catch((err) => {
        messageStore.updateMessage('Could not register');
        setTimeout(() => {
            messageStore.resetMessage();
        }, 3000);
    });
});
</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="onSubmit" method="POST">
                <div>
                    <div class="flex items-center justify-between">
                        <label for="firstname" class="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                    </div>
                    <InputText type="text" v-model="firstname" placeholder="First Name" :error="errors['firstname']" />
                </div>
                <div>
                    <div class="flex items-center justify-between">
                        <label for="lastname" class="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                    </div>
                    <InputText type="text" v-model="lastname" placeholder="Last Name" :error="errors['lastname']" />
                </div>
                <div >
                    <div class="flex items-center justify-between">
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    </div>
                    <InputText type="email" v-model="email" placeholder="Email address" :error="errors['email']" />
                </div>
                <div>
                    <div class="flex items-center justify-between">
                        <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    </div>
                    <InputText type="username" v-model="username" placeholder="Username" :error="errors['username']" />
                </div>
                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <InputText type="password" v-model="password" placeholder="Password" :error="errors['password']" />
                </div>
                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Register
                    </button>
                </div>
            </form>
            <p class="mt-10 text-center text-sm text-gray-500">Already a member? {{ '' }}
                <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in here</a>
            </p>
        </div>
    </div>
</template>
