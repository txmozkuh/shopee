import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
// import { getRules } from '../../utils/rules'
import Input from '@components/Input'
import { registerSchema, SchemaForm } from '@utils/rules'
import { registerAccount } from '@apis/auth.api'
import { isAxiosUnprocessableEntityError } from '@utils/utils'
import { ResponseApi } from '../../types/utils.types'
import { AppContext } from '@contexts/app.context'
import Button from '@components/Button'
import { path } from '@constants/path'
import { User } from '../../types/user.types'

export default function Register() {
  const { setProfile, setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<SchemaForm>({
    resolver: yupResolver(registerSchema)
  })

  // const rules = getRules(getValues)
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<SchemaForm, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])

    registerAccountMutation.mutate(body, {
      onSuccess: (res) => {
        setIsAuthenticated(true)
        setProfile(res.data.data?.user as User)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<Omit<SchemaForm, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<SchemaForm, 'confirm_password'>, {
                message: formError[key as keyof Omit<SchemaForm, 'confirm_password'>],
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
      <form className='p-10 rounded-md bg-white shadow-lg' onSubmit={onSubmit} noValidate>
        <div className='text-xl'>Đăng ký</div>
        <Input
          type='email'
          name='email'
          className='mt-3'
          classNameInput='p-3 w-full outline-none border text-sm border-gray-300 focus:border-gray-500 focus:shadow-sm round-sm'
          placeholder='Email'
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
          noError={false}
          register={register}
          errorMessage={errors.password?.message}
        />
        <Input
          type='password'
          name='confirm_password'
          className='mt-3'
          classNameInput='p-3 w-full outline-none border text-sm border-gray-300 focus:border-gray-500 focus:shadow-sm round-sm'
          placeholder='Confirm Password'
          noError={false}
          register={register}
          errorMessage={errors.confirm_password?.message}
        />
        <Button
          disabled={registerAccountMutation.isPending}
          isLoading={registerAccountMutation.isPending}
          className='w-full py-4 px-2 mt-6 text-center uppercase bg-shopee text-white text-sm rounded-sm '
        >
          Đăng ký
        </Button>
        <div className='mt-8 text-sm flex justify-center'>
          <p className='text-neutral-400 mr-1'>Bạn đã có tài khoản?</p>
          <Link to={path.login}>
            <p className='text-shopee font-medium '>Đăng nhập</p>
          </Link>
        </div>
      </form>
    </>
  )
}
