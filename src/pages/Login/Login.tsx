import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '@components/Input'
import { LoginSchemaForm, loginSchema } from '../../utils/rules'
import { useMutation } from '@tanstack/react-query'
import { login } from '../../apis/auth.api'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { ResponseApi } from '../../types/utils.types'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import Button from '@components/Button'
import { path } from '../../constants/path'
import { User } from '../../types/user.types'
// import FormData from '../../types/types'
// import { getRules } from '../../utils/rules'

export default function Login() {
  const { setProfile, setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginSchemaForm>({
    resolver: yupResolver(loginSchema)
  })
  // const rules = getRules()

  const loginMutation = useMutation({
    mutationFn: (body: LoginSchemaForm) => login(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = data
    loginMutation.mutate(body, {
      onSuccess: (res) => {
        setProfile(res.data.data?.user as User)
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: (err) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<LoginSchemaForm>>(err)) {
          const formError = err.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof LoginSchemaForm, {
                message: formError[key as keyof LoginSchemaForm],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <>
      <form className='p-10 rounded-sm bg-white shadow-lg' onSubmit={onSubmit} noValidate>
        <div className='text-xl'>Đăng nhập</div>
        <Input
          type='email'
          name='email'
          className='mt-3'
          classNameInput='p-3 w-full outline-none border text-sm border-gray-300 focus:border-gray-500 focus:shadow-sm round-sm'
          placeholder='Email'
          autoComplete='true'
          noError={false}
          register={register}
          errorMessage={errors.email?.message}
        />
        <Input
          type='password'
          name='password'
          className='mt-3'
          classNameInput='p-3 w-full outline-none border text-sm border-gray-300 focus:border-gray-500 focus:shadow-sm round-sm'
          placeholder='Password'
          autoComplete='current-password'
          noError={false}
          register={register}
          errorMessage={errors.password?.message}
        />
        {/* <button className='w-full py-4 px-2 mt-6 text-center uppercase bg-shopee text-white text-sm rounded-sm '>
          Đăng nhập
        </button> */}
        <Button
          disabled={loginMutation.isPending}
          isLoading={loginMutation.isPending}
          className='w-full py-4 px-2 mt-6  uppercase bg-shopee text-white text-sm rounded-sm'
        >
          Đăng nhập
        </Button>
        <div className='mt-8 text-sm flex justify-center'>
          <p className='text-neutral-400 mr-1'>Bạn mới biết đến Shopee?</p>
          <Link to={path.register}>
            <p className='text-shopee font-medium '>Đăng ký</p>
          </Link>
        </div>
      </form>
    </>
  )
}
