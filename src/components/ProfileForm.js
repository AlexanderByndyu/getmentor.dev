import Multiselect from 'multiselect-react-dropdown'
import { useForm, Controller } from 'react-hook-form'
import Wysiwyg from './Wysiwyg'
import filters from '../config/filters'

export default function ProfileForm({ mentor, isLoading, isError, onSubmit }) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
          Ваше имя и фамилия
        </label>

        {errors.name && (
          <div className="text-sm text-red-700 mt-3 mb-2">Это поле обязательно для заполнения.</div>
        )}

        <input
          type="text"
          {...register('name', { required: true })}
          defaultValue={mentor.name}
          id="name"
          autoComplete="name"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="job" className="block mb-2 font-medium text-gray-700">
          Должность @ Компания
        </label>

        {errors.job && (
          <div className="text-sm text-red-700 mt-3 mb-2">Это поле обязательно для заполнения.</div>
        )}

        <input
          type="text"
          {...register('job', { required: true })}
          defaultValue={mentor.job}
          id="job"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="flex space-x-8">
        <div>
          <label htmlFor="experience" className="block mb-2 font-medium text-gray-700">
            Опыт
          </label>

          <select
            {...register('experience')}
            defaultValue={mentor.experience}
            id="experience"
            className="block w-full py-2 pl-3 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {filters.experience.map((item) => (
              <option key={item.airtableKey} value={item.airtableKey}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block mb-2 font-medium text-gray-700">
            Цена
          </label>

          <select
            {...register('price')}
            defaultValue={mentor.price}
            id="price"
            className="block w-full py-2 pl-3 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {filters.price.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="tags" className="block mb-2 font-medium text-gray-700">
          Теги
        </label>

        <Controller
          name="tags"
          control={control}
          defaultValue={mentor.tags}
          render={({ field }) => (
            <Multiselect
              selectedValues={field.value}
              onSelect={(selectedList, selectedItem) => field.onChange(selectedList)}
              onRemove={(selectedList, removedItem) => field.onChange(selectedList)}
              options={filters.tags}
              isObject={false}
              placeholder=""
              closeIcon="cancel"
              avoidHighlightFirstOption={true}
              closeOnSelect={false}
              style={{
                multiselectContainer: {},
                searchBox: {
                  border: '1px solid rgb(209, 213, 219)',
                  padding: '0.5rem 0.75rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.375rem',
                },
                inputField: {
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                  padding: 'unset',
                  margin: 'unset',
                },
                chips: {
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                  margin: 'unset',
                },
                optionContainer: {
                  border: '1px solid rgb(209, 213, 219)',
                },
                option: {
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                  padding: '0.5rem 0.75rem',
                },
                groupHeading: {},
              }}
            />
          )}
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-2 font-medium text-gray-700">
          Описание
        </label>

        {errors.description && (
          <div className="text-sm text-red-700 mt-3 mb-2">Это поле обязательно для заполнения.</div>
        )}

        <div className="mt-1">
          <Controller
            name="description"
            control={control}
            defaultValue={mentor.description}
            rules={{ required: true }}
            render={({ field }) => (
              <Wysiwyg
                content={field.value}
                onUpdate={(editor) => field.onChange(editor.getHTML())}
              />
            )}
          />
        </div>
      </div>

      {isError && (
        <div className="text-red-700">
          Ошибка. Скорее всего мы уже чиним, попробуйте сохранить форму позже.
        </div>
      )}

      {!isLoading ? (
        <button className="button" type="submit">
          Сохранить
        </button>
      ) : (
        <div className="py-6">Сохраняю...</div>
      )}
    </form>
  )
}