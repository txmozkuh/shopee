import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserInfo, updateUserInfo, uploadUserAvatar } from '../../../apis/user.api'
import Input from '@components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UpdateUserForm, updateUserSchema } from '../../../utils/rules'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { getAvatarUrl } from '../../../utils/utils'

export default function Profile() {
  const queryClient = useQueryClient()

  const { data: userData } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getUserInfo()
  })

  const userInfo = userData?.data.data
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()
  const previewImage = file ? URL.createObjectURL(file) : getAvatarUrl(userInfo ? (userInfo.avatar ?? '') : '')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UpdateUserForm>({
    resolver: yupResolver(updateUserSchema)
  })
  const updateProfileMutation = useMutation({
    mutationFn: (body: UpdateUserForm) => updateUserInfo(body)
  })
  const uploadProfileAvatarMutation = useMutation({
    mutationFn: (body: FormData) => uploadUserAvatar(body)
  })
  const onSubmit = handleSubmit(async (data) => {
    if (file) {
      const form = new FormData()
      form.append('image', file)
      const uploadAvatarApi = await uploadProfileAvatarMutation.mutateAsync(form)
      setValue('avatar', uploadAvatarApi.data.data)
    }
    const sanitizedData = {
      ...data,
      date_of_birth: data.date_of_birth ? new Date(data.date_of_birth).toISOString().split('T')[0] : undefined,
      avatar: file ? data.avatar : undefined
    }

    updateProfileMutation.mutate(sanitizedData, {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ['profile'] })

        toast.info(res.data.message)
      },
      onError: (err) => {
        toast.error(err.message)
      }
    })
  })

  const handleUploadAvatar = () => {
    fileInputRef?.current?.click()
  }

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const avatarFile = event.target.files?.[0]
    if (avatarFile) {
      setFile(avatarFile)
    }
  }

  return (
    <form className='bg-white px-6 py-4 rounded-sm shadow-sm' onSubmit={onSubmit}>
      <div className='border-b pb-4 text-center md:text-left'>
        <h1 className='text-lg font-medium text-[#333]'>Hồ sơ của tôi</h1>
        <p className='text-sm text-neutral-600'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <div className='grid grid-cols-3 mt-6 gap-x-4'>
        <div className='col-span-full md:col-span-2 grid grid-cols-3 leading-loose gap-y-2 gap-x-6 text-sm px-8'>
          {/* <div className='col-span-1 text-right text-neutral-500'>Tên đăng nhập</div>
          <div className='col-span-2 px-4'>{userInfo?.email}</div> */}
          <div className='col-span-1 text-right self-center text-neutral-500'>Tên</div>
          <div className='col-span-2'>
            <Input
              type='text'
              name='name'
              defaultValue={userInfo?.name}
              classNameInput='border w-full outline-none rounded-sm px-4 py-1'
              register={register}
              noError={false}
              errorMessage={errors.name?.message}
            />
          </div>
          <div className='col-span-1 text-right  text-neutral-500'>Email</div>
          <div className='col-span-2 px-4'>{userInfo?.email}</div>
          <div className='col-span-1 text-right  text-neutral-500 self-center'>Số điện thoại</div>
          <div className='col-span-2'>
            <Input
              type='text'
              name='phone'
              defaultValue={userInfo?.phone}
              classNameInput='border w-full outline-none rounded-sm px-4 py-1'
              register={register}
              noError={false}
              errorMessage={errors.phone?.message}
            />
          </div>
          <div className='col-span-1 text-right  text-neutral-500'>Giới tính</div>
          <div className='col-span-2 px-4'>Nam</div>
          <div className='col-span-1 text-right self-center text-neutral-500'>Ngày sinh</div>
          <div className='col-span-2'>
            <Input
              type='date'
              name='date_of_birth'
              defaultValue={userInfo?.date_of_birth ? new Date(userInfo.date_of_birth).toISOString().split('T')[0] : ''}
              classNameInput='border w-full outline-none rounded-sm px-4 py-1'
              register={register}
              noError={false}
              errorMessage={errors.date_of_birth?.message}
            />
          </div>
        </div>
        <div className='col-span-full md:col-span-1 flex flex-col px-8 md:border-l h-fit items-center gap-4'>
          <img src={previewImage} className='rounded-[50%] size-32' />
          <input
            type='file'
            name='avatar'
            className='border w-full outline-none rounded-sm px-4 py-1 hidden'
            accept='  
          .jpg,.jepg,.png'
            ref={fileInputRef}
            onChange={handleChangeAvatar}
          />
          <button className='p-2 text-neutral-500 border rounded-sm text-sm' type='button' onClick={handleUploadAvatar}>
            Chọn ảnh
          </button>
          <span className='text-xs lg:text-sm text-neutral-400 text-center'>
            Dụng lượng file tối đa 1 MB <br /> Định dạng: .JPG,.JPEG, .PNG
          </span>
        </div>
        <button className='col-span-full px-6 py-2 my-6 bg-shopee text-white rounded-sm w-fit md:col-start-2 md:justify-self-start justify-self-center'>
          Lưu
        </button>
      </div>
    </form>
  )
}
