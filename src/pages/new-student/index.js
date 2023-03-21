import {useState} from 'react'
import InfoCard from '../../shared/info-card'
import SectionWrapper from '../../shared/section-wrapper'
import './NewStudent.css'
import http from '../../utils/http'
import InputText from '../../shared/forms/input-text'
import useForm from '../../hooks/useForm'

const initalValues = {
  name: '', 
  course: '', 
  registration: ''
}

const NewStudent = () => {
  const [ inputs, setInputs, handleInputChange] = useForm(initalValues)
  
  const handleSubmit = (event) => {
    event.preventDefault();
    http.post('alunos', inputs)
    setInputs({})
  }

  return (
    <SectionWrapper  title="Novo estudante"  >
      <InfoCard title="Cadastro de aluno" isFullWith>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <InputText name='name'value={inputs.name} handleChange={handleInputChange} />
            </div>
            <div>
              <label>Matrícula</label>
              <input type='text' name='registration' value={inputs.registration || ""} onChange={handleInputChange} />
            </div>
            <label>Curso</label>
            <select name='course' value={inputs.course || ""}  onChange={handleInputChange}>
              <option value="">Selecione</option>
              <option>Sistemas para internet</option>
              <option>Redes</option>
            </select>
          </div> 
          <button type='submit'>Salvar</button>     
        </form>
      </InfoCard>
    </SectionWrapper>
  )
}

export default NewStudent