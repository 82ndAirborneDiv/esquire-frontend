import * as actions from '../actions'
import * as types from '../actionTypes'

describe('Home actions creators', () => {
  test('should create an action to get projects', () => {
    const expectedAction = {
      type: types.GET_PROJECTS_REQUEST
    }
    expect(actions.getProjectsRequest()).toEqual(expectedAction)
  })

  test('should create an action to indicate getting projects was successful', () => {
    const payload = [{ name: 'Project 1' }]
    const expectedAction = {
      type: types.GET_PROJECTS_SUCCESS,
      payload
    }

    expect(actions.getProjectsSuccess(payload)).toEqual(expectedAction)
  })

  test('should create an action to indicate getting projects failed', () => {
    const payload = 'errorValue'
    const expectedAction = {
      type: types.GET_PROJECTS_FAIL,
      errorValue: payload,
      error: true
    }

    expect(actions.getProjectsFail(payload)).toEqual(expectedAction)
  })

  test('should create an action update projects', () => {
    const project = { name: 'Project 1' }
    const expectedAction = {
      type: types.UPDATE_PROJECT_REQUEST,
      project
    }

    expect(actions.updateProjectRequest(project)).toEqual(expectedAction)
  })

  test('should create an action to indicate updating project was successfully', () => {
    const payload = { name: 'Project 1' }
    const expectedAction = {
      type: types.UPDATE_PROJECT_SUCCESS,
      payload
    }

    expect(actions.updateProjectSuccess(payload)).toEqual(expectedAction)
  })

  test('should create an action to indicate updating a project failed', () => {
    const payload = 'errorValue'
    const expectedAction = {
      type: types.UPDATE_PROJECT_FAIL,
      errorValue: payload,
      error: true
    }

    expect(actions.updateProjectFail(payload)).toEqual(expectedAction)
  })

  test('should create an action to toggle bookmark', () => {
    const project = { id: 12345, name: 'project 1' }
    const expectedAction = {
      type: types.TOGGLE_BOOKMARK,
      project
    }

    expect(actions.toggleBookmark(project)).toEqual(expectedAction)
  })

  test('should create an action to sort projects', () => {
    const sortBy = 'name'
    const expectedAction = {
      type: types.SORT_PROJECTS,
      sortBy
    }

    expect(actions.sortProjects(sortBy)).toEqual(expectedAction)
  })

  test('should create an action to update page number', () => {
    const page = 1
    const expectedAction = {
      type: types.UPDATE_PAGE,
      page
    }

    expect(actions.updatePage(page)).toEqual(expectedAction)
  })

  test('should create an action to update rows per page', () => {
    const rowsPerPage = 5
    const expectedAction = {
      type: types.UPDATE_ROWS,
      rowsPerPage
    }

    expect(actions.updateRows(rowsPerPage)).toEqual(expectedAction)
  })
})