export default class Job {
  constructor (args) {
    this.id = args.id
    this.status = args.status
    this.activated = args.activated
    this.published = args.published
    this.oneOff = args.oneOff
    this.budget = args.budget
    this.title = args.title
    this.location = args.location
    this.description = args.description
    this.salary = args.salary
    this.applyURL = args.applyURL
    this.applyEmail = args.applyEmail
    this.employerName = args.employerName
    this.employerEmail = args.employerEmail
    this.employerImage = args.employerImage
    this.createdAt = args.createdAt
    this.expiredAt = args.expiredAt
  }
}
