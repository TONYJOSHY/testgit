const express = require('express')
const router = express.Router()
const { projects, ROLE } = require('./data')
const { authUser } = require('./basicAuth');
const { canViewProject } = require('./projectAuth')

router.get('/', authUser, (req, res) => {
    res.json(scopedProject(req.user, projects))
})

router.get('/:projectId', setProject, authUser,
    authGetProject, (req, res) => {
        res.json(req.project)
    })

function setProject(req, res, next) {
    const projectId = parseInt(req.params.projectId)
    req.project = projects.find(project => project.id === projectId)

    if (req.project == null) {
        res.status(404)
        return res.send('Project not found')
    }
    next()
}

function authGetProject(req, res, next) {
    if (!canViewProject(req.user, req.project)) {
        res.status(401)
        return res.send('Not allowded')
    }
    next();
}

function scopedProject(user, projects) {
    if (user.role == ROLE.ADMIN) return projects;
    return projects.filter(project => project.userId === user.id)
}

module.exports = router