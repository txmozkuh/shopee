import { useForm } from 'react-hook-form'
import { ChangePasswordForm, UpdateUserForm, changePasswordSchema } from '../../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { updateUserInfo } from '../../../apis/user.api'
import Input from '../../../components/Input'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { path } from '../../../constants/path'

export default function PasswordChange() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm<ChangePasswordForm>({
    resolver: yupResolver(changePasswordSchema)
  })
  const updateProfileMutation = useMutation({
    mutationFn: (body: UpdateUserForm) => updateUserInfo(body)
  })
  const onSubmit = handleSubmit(async (data) => {
    const { confirm_password, ...password_data } = data
    updateProfileMutation.mutate(password_data, {
      onSuccess: (res) => {
        toast.info(res.data.message)
        navigate(path.profile)
      }
    })
  })
  return (
    <form className='bg-white px-6 py-4 rounded-sm shadow-sm' onSubmit={onSubmit}>
      <div className='border-b pb-4 text-center md:text-left'>
        <h1 className='text-lg font-medium text-[#333]'>Đổi mật khẩu</h1>
      </div>
      <div className='grid grid-cols-3 mt-6 gap-x-4'>
        <div className='col-span-full md:col-span-2 grid grid-cols-3 leading-loose gap-y-2 gap-x-6 text-sm px-8'>
          <div className='col-span-1 text-right self-center text-neutral-500'>Mật khẩu cũ</div>
          <div className='col-span-2'>
            <Input
              type='password'
              name='password'
              classNameInput='border w-full outline-none rounded-sm px-4 py-1'
              register={register}
              noError={false}
              errorMessage={errors.password?.message}
            />
          </div>
          <div className='col-span-1 text-right self-center text-neutral-500'>Mật khẩu mới</div>
          <div className='col-span-2'>
            <Input
              type='password'
              name='new_password'
              classNameInput='border w-full outline-none rounded-sm px-4 py-1'
              register={register}
              noError={false}
              errorMessage={errors.new_password?.message}
            />
          </div>
          <div className='col-span-1 text-right self-center text-neutral-500'>Xác nhận mật khẩu mới</div>
          <div className='col-span-2'>
            <Input
              type='password'
              name='confirm_password'
              classNameInput='border w-full outline-none rounded-sm px-4 py-1'
              register={register}
              noError={false}
              errorMessage={errors.confirm_password?.message}
            />
          </div>
        </div>
        <button className='col-span-full px-6 py-2 my-6 bg-shopee text-white rounded-sm w-fit md:col-start-2 md:justify-self-start justify-self-center'>
          Lưu
        </button>
      </div>
    </form>
  )
}
